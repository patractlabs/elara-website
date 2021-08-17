import React, { useState, useRef, useEffect, useCallback, FC } from 'react'
import { message, Table, ConfigProvider } from 'antd'
import Tooltip from '../../shared/components/Tooltip'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { ENDPOINTS_URL, WSS_ENDPOINTS_URL } from '../../config/origin'
import OverviewCard from '../../shared/components/OverviewCard'
import CreateProjectBtn from '../../shared/components/CreateProjectBtn'
import { useApi } from '../../core/hooks/useApi'
import { Project, InvalidTableDataExt } from '../../core/types/classes/project'
import { formatTime } from '../../shared/utils'
import {
  apiFetchProjectList,
  apiFetchProjectErrorStatics,
  apiUpdateProjectName,
  apiUpdateProjectLimit,
  apiDelProject,
} from '../../core/data/api'
import BandwidthMixChart from './BandwidthMixChart'
import CallMethodChart from './CallMethodChart'
import SettingField, { IRefReturnType } from './SettingField'
import BasicModal from '../../shared/components/BasicModalContainer'
import EmptySample from '../../shared/components/EmptySample'
import Pagination from '../../shared/components/Pagination'

import './index.css'

const Projects: FC<{}> = () => {
  const [tabNum, setTabNum] = useState(0)
  const [viewType, switchToView] = useState<'setting' | 'request'>('request')
  const [projectInfo, setProjectInfo] = useState<Project[]>([])
  const [invalidData, setInvalidData] = useState<InvalidTableDataExt>()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const nameRef = useRef<IRefReturnType>(null)
  const rateLimitRef = useRef<IRefReturnType>(null)
  const dailyRequsetRef = useRef<IRefReturnType>(null)
  const { t } = useTranslation()
  const params = useParams<{ chain: string; state?: any }>()
  const { user } = useApi()
  const wssEndpointUrl = `${WSS_ENDPOINTS_URL}/${projectInfo[tabNum]?.chain}/${projectInfo[tabNum]?.pid}`
  const httpEndpointUrl = `${ENDPOINTS_URL}/${projectInfo[tabNum]?.chain}/${projectInfo[tabNum]?.pid}`
  const updatePageData = useCallback(async () => {
    const res = await apiFetchProjectList(user.id, params.chain)
    setProjectInfo(res)
  }, [user.id, params.chain])

  const handleUpdateProjectName = async () => {
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

  const handleUpdateLimit = async () => {
    await apiUpdateProjectLimit({
      id: projectInfo[tabNum]?.id,
      reqDayLimit: Number(rateLimitRef.current!.value),
      reqSecLimit: Number(dailyRequsetRef.current!.value),
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
  }, [params.chain, user.id, updatePageData])

  const changeProjectErrorStatics = useCallback(
    (page: number, size: number) => {
      apiFetchProjectErrorStatics({
        page,
        size,
        chain: projectInfo[tabNum]?.chain,
        pid: projectInfo[tabNum]?.pid,
      }).then((res) => {
        res.list = [
          {
            proto: 'wss',
            method: 'health',
            code: 200,
            delay: 2,
            time: '2020-01-01 23:22',
          },
        ]
        setInvalidData(res)
      })
    },
    [projectInfo, tabNum]
  )
  useEffect(() => {
    changeProjectErrorStatics(1, 10)
  }, [changeProjectErrorStatics])

  return (
    <div className="projects">
      <CreateProjectBtn chain={params.chain} onCloseCallback={updatePageData} />
      <div className="projects-tabs">
        {projectInfo.map((data, index) => (
          <div
            key={data.name}
            className={`tab-item ${tabNum === index && 'active'}`}
            onClick={() => {
              setTabNum(index)
              console.log(projectInfo[tabNum].name)
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
                  {projectInfo[tabNum]?.reqCnt}
                </OverviewCard>
                <OverviewCard title={t('summary.dailyBandwidth')}>
                  {projectInfo[tabNum]?.bw}
                </OverviewCard>
                <OverviewCard title={t('summary.AvgResTime')}>
                  {projectInfo[tabNum]?.timeoutDelay}
                </OverviewCard>
                <OverviewCard title={t('summary.InvalidReq')}>
                  {projectInfo[tabNum]?.inReqCnt}
                </OverviewCard>
              </div>
              <div className="api stat-card">
                <div className="title">API</div>
                <div className="api-info">
                  <div className="title">Project ID</div>
                  <div
                    className="value"
                    onClick={() => copy(projectInfo[tabNum]?.pid)}
                  >
                    <Tooltip title={t('tip.copy')}>
                      {projectInfo[tabNum]?.pid}
                    </Tooltip>
                  </div>
                </div>
                <div className="api-info">
                  <div className="title">Project Secret</div>
                  <div
                    className="value"
                    onClick={() => copy(projectInfo[tabNum]?.secret)}
                  >
                    <Tooltip title={t('tip.copy')}>
                      {projectInfo[tabNum]?.secret}
                    </Tooltip>
                  </div>
                </div>
                <div className="api-info">
                  <div className="title">Endpoints(WSS)</div>
                  <div className="value" onClick={() => copy(wssEndpointUrl)}>
                    <Tooltip title={t('tip.copy')}>{wssEndpointUrl}</Tooltip>
                  </div>
                </div>
                <div className="api-info">
                  <div className="title">Endpoints(HTTPS)</div>
                  <div className="value" onClick={() => copy(httpEndpointUrl)}>
                    <Tooltip title={t('tip.copy')}>{httpEndpointUrl}</Tooltip>
                  </div>
                </div>
              </div>
              <BandwidthMixChart
                chain={projectInfo[tabNum]?.chain}
                pid={projectInfo[tabNum]?.pid}
              />
              <CallMethodChart
                chain={projectInfo[tabNum]?.chain}
                pid={projectInfo[tabNum]?.pid}
              />
              <div className="requsets-chart stat-card">
                <div className="title">{t('Details.invalidLimitReqs')}</div>
                <div className="invalid-table">
                  <ConfigProvider
                    renderEmpty={() => (
                      <EmptySample title="No data" height={232} />
                    )}
                  >
                    <Table
                      rowKey={(data) => data.method}
                      dataSource={invalidData?.list}
                      columns={[
                        {
                          title: t('Details.Method'),
                          dataIndex: 'method',
                          key: 'method',
                        },
                        {
                          title: t('Details.ErrorCode'),
                          dataIndex: 'code',
                          key: 'code',
                        },
                        {
                          title: t('Details.ResponseTime'),
                          dataIndex: 'delay',
                          key: 'delay',
                        },
                        {
                          title: t('Details.Time'),
                          dataIndex: 'time',
                          key: 'time',
                        },
                      ]}
                      pagination={false}
                    ></Table>
                    {invalidData?.list && invalidData?.list.length > 0 && (
                      <Pagination
                        total={100}
                        onChange={(page, pageSize) => {
                          console.log(page, pageSize)
                          
                          changeProjectErrorStatics(page, pageSize)
                        }}
                      />
                    )}
                  </ConfigProvider>
                </div>
              </div>
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
                  ref={rateLimitRef}
                  label={t('Details.rateLimitLabel')}
                  defaultValue={projectInfo[tabNum].reqSecLimit}
                  handleConfirm={handleUpdateLimit}
                />
                <SettingField
                  ref={dailyRequsetRef}
                  label={t('Details.dailyTotalReqLable')}
                  defaultValue={projectInfo[tabNum].reqDayLimit}
                  handleConfirm={handleUpdateLimit}
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
