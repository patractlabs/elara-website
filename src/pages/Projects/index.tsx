import { useState, useRef, useEffect, useCallback, useContext, FC } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ENDPOINTS_URL, WSS_ENDPOINTS_URL } from '../../config/origin'
import OverviewCard from '../../shared/components/OverviewCard'
import CreateProjectBtn from '../../shared/components/CreateProjectBtn'
import { useApi } from '../../core/hooks/useApi'
import { Project } from '../../core/types/classes/project'
import { formatTime, formatBandwidth } from '../../shared/utils'
import {
  apiFetchProjectList,
  apiUpdateProjectName,
  apiUpdateProjectLimit,
  apiDelProject,
} from '../../core/data/api'
import ClipboardTxt from './ClipboardTxt'
import BandwidthMixChart from './BandwidthMixChart'
import CallMethodChart from './CallMethodChart'
import InvalidReqTable from './InvalidReqTable'
import CountryTable from './CountryTable'
import SettingField, { IRefReturnType } from './SettingField'
import BasicModal from '../../shared/components/BasicModalContainer'
import EmptySample from '../../shared/components/EmptySample'
import { DashboardContext } from '../../core/context/dashboard-context'
import './index.css'

const Projects: FC<{}> = () => {
  const [tabNum, setTabNum] = useState(0)
  const [viewType, switchToView] = useState<'setting' | 'request'>('request')
  const [projectInfo, setProjectInfo] = useState<Project[]>([])
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const { updateMenu } = useContext(DashboardContext)
  const nameRef = useRef<IRefReturnType>(null)
  const rateLimitRef = useRef<IRefReturnType>(null)
  const dailyRequsetRef = useRef<IRefReturnType>(null)
  const { t } = useTranslation()
  const params = useParams<{ chain: string; state?: any }>()
  const { user, updateUser} = useApi()
  const wssEndpointUrl = `${WSS_ENDPOINTS_URL}/${projectInfo[tabNum]?.chain}/${projectInfo[tabNum]?.pid}`
  const httpEndpointUrl = `${ENDPOINTS_URL}/${projectInfo[tabNum]?.chain}/${projectInfo[tabNum]?.pid}`
  const updatePageData = useCallback(async () => {
    const res = await apiFetchProjectList(user.id, params.chain)
    setProjectInfo(res)
  }, [user.id, params.chain])

  const handleUpdateProjectName = async () => {
    if (nameRef.current!.value === projectInfo[tabNum].name) return
    if (!/^[a-zA-Z]{4}[a-zA-Z0-9]{0,10}$/.test(nameRef.current!.value))
      return t('tip.invalidName')
    return await apiUpdateProjectName({
      userId: user.id,
      chain: projectInfo[tabNum]?.chain,
      id: projectInfo[tabNum]?.id,
      name: nameRef.current!.value,
    }).then(
      () => {
        message.success(t('tip.updated'))
        // 更新页面数据
        updatePageData()
        return ''
      },
      (res) => {
        message.error(t('tip.fail'))
        return res.msg
      }
    )
  }

  const handleUpdateLimit = async (val: string) => {
    if (isNaN(Number(val))) return t('tip.invalidNumber')
    await apiUpdateProjectLimit({
      id: projectInfo[tabNum]?.id,
      reqDayLimit: Number(dailyRequsetRef.current!.value),
      reqSecLimit: Number(rateLimitRef.current!.value),
    }).then(
      () => {
        message.success(t('tip.updated'))
        updatePageData()
        // 更新页面数据
      },
      (res) => {
        message.success(t('tip.fail'))
        return res.msg
      }
    )
  }

  const handleDelProject = () => {
    apiDelProject({ id: projectInfo[tabNum].id }).then(
      () => {
        message.success(t('tip.delete'))
        updatePageData()
        updateMenu()
        updateUser()
        // 更新页面数据
      },
      (res) => {
        message.success(t('tip.fail'))
      }
    )
    setDeleteModalVisible(false)
  }

  useEffect(() => {
    updatePageData()
  }, [params.chain, user.id, tabNum, updatePageData]) 

  return (
    <div className="projects">
      <CreateProjectBtn chain={params.chain} onCloseCallback={updatePageData} />
      <div className="projects-tabs">
        {projectInfo.map((data, index) => (
          <div
            key={data.name}
            className={`tab-item ${tabNum === index ? 'active' : ''}`}
            onClick={() => {
              setTabNum(index)
            }}
          >
            {data.name}
          </div>
        ))}
      </div>
      {projectInfo.length > 0 ? (
        <div className="main">
          <div className="info-container">
            <div className={`info-item created`}>
              {`${t('summary.Created')}: ${formatTime(
                projectInfo[tabNum]?.createdAt
              )}`}
            </div>
            <div className={`info-item team`}>
              {`${t('summary.Team')}: ${projectInfo[tabNum]?.team}`}
            </div>
            <div className={`info-item network`}>
              {`${t('summary.Network')}: ${projectInfo[tabNum]?.chain}`}
            </div>
            <div className={`info-item ${projectInfo[tabNum]?.status}`}>
              {`${t('summary.Status')}: ${projectInfo[tabNum]?.status}`}
            </div>
          </div>
          <div className="view-switch">
            <div
              className={`request ${viewType === 'request' && 'active'}`}
              onClick={() => {
                switchToView('request')
              }}
            >
              {t('Details.Requests')}
            </div>
            <div
              className={`setting ${viewType === 'setting' && 'active'}`}
              onClick={() => {
                switchToView('setting')
              }}
            >
              {t('Details.Settings')}
            </div>
          </div>
          {viewType === 'request' && (
            <div className="request-section">
              <div className="category">
                <OverviewCard title={t('summary.dailyReq')}>
                  {projectInfo[tabNum].reqCnt}
                </OverviewCard>
                <OverviewCard title={t('summary.dailyBandwidth')}>
                  {formatBandwidth(projectInfo[tabNum].bw)}
                </OverviewCard>
                <OverviewCard title={t('summary.AvgResTime')}>
                  {projectInfo[tabNum].delay} ms
                </OverviewCard>
                <OverviewCard title={t('summary.InvalidReq')}>
                  {projectInfo[tabNum].inReqCnt}
                </OverviewCard>
              </div>
              <div className="api stat-card">
                <div className="title">API</div>
                <ClipboardTxt
                  label="Project ID"
                  txt={projectInfo[tabNum]?.pid}
                />
                <ClipboardTxt
                  label="Project Secret"
                  txt={projectInfo[tabNum]?.secret}
                />
                <ClipboardTxt label="Endpoints(WSS)" txt={wssEndpointUrl} />
                <ClipboardTxt label="Endpoints(HTTPS)" txt={httpEndpointUrl} />
              </div>
              <BandwidthMixChart
                chain={projectInfo[tabNum].chain}
                pid={projectInfo[tabNum].pid}
              />
              <CallMethodChart
                chain={projectInfo[tabNum].chain}
                pid={projectInfo[tabNum].pid}
              />
              <InvalidReqTable
                chain={projectInfo[tabNum].chain}
                pid={projectInfo[tabNum].pid}
              />
              <CountryTable
                chain={projectInfo[tabNum].chain}
                pid={projectInfo[tabNum].pid}
              />
            </div>
          )}
          {viewType === 'setting' && (
            <div className="setting-section">
              <div className="setting-item">
                <div className="title">{t('Details.GeneralSettings')}</div>
                <SettingField
                  ref={nameRef}
                  label={t('Details.projectName')}
                  tooltip={t('Details.maxChar')}
                  defaultValue={projectInfo[tabNum].name}
                  handleConfirm={handleUpdateProjectName}
                />
              </div>
              <div className="setting-item">
                <div className="title">{t('Details.RequestLimiting')}</div>
                <SettingField
                  type="number"
                  ref={rateLimitRef}
                  label={t('Details.rateLimitLabel')}
                  defaultValue={
                    Number(projectInfo[tabNum].reqSecLimit) > 0
                      ? projectInfo[tabNum].reqSecLimit
                      : ''
                  }
                  handleConfirm={() =>
                    handleUpdateLimit(rateLimitRef.current!.value)
                  }
                />
                <SettingField
                  type="number"
                  ref={dailyRequsetRef}
                  label={t('Details.dailyTotalReqLable')}
                  defaultValue={
                    Number(projectInfo[tabNum].reqDayLimit) >= 0
                      ? projectInfo[tabNum].reqDayLimit
                      : ''
                  }
                  handleConfirm={() =>
                    handleUpdateLimit(dailyRequsetRef.current!.value)
                  }
                />
              </div>
              <div
                className="setting-item setting-delete-btn"
                onClick={() => setDeleteModalVisible(true)}
              >
                {t('Details.DelProject')}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="project-empty">
          <EmptySample title="No project" height={560} />
        </div>
      )}
      <BasicModal
        title={
          <span style={{ color: '#DF3D4B' }}>{t('Details.DelProject')}</span>
        }
        visible={deleteModalVisible}
        okText={t('modal.delete')}
        onCancel={() => {
          setDeleteModalVisible(false)
        }}
        onOk={() => {
          handleDelProject()
        }}
      >
        {t('modal.deleteBody')}
      </BasicModal>
    </div>
  )
}

export default Projects
