import React, { useState, useRef, useEffect, FC } from 'react'
import { message, Table } from 'antd'
import Tooltip from '../../shared/components/Tooltip'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, Link } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { ENDPOINTS_URL, WSS_ENDPOINTS_URL } from '../../config/origin'
import OverviewCard from '../../shared/components/OverviewCard'
import CreateProjectBtn from '../../shared/components/CreateProjectBtn'
import { useApi } from '../../core/hooks/useApi'
import {
  Project,
  InvalidTableDataExt,
} from '../../core/types/classes/project'
import { formatTime } from '../../shared/utils'
import {
  apiFetchProjectList,
  apiFetchProjectErrorStatics,
  apiUpdateProjectName,
  apiUpdateProjectLimit,
} from '../../core/data/api'
import BandwidthMixChart from './BandwidthMixChart'
import CallMethodChart from './CallMethodChart'
import SettingField, { IRefReturnType } from './SettingField'
import BasicModal from '../../shared/components/BasicModalContainer'

import './index.css'
import { rejects } from 'node:assert'

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
  const params = useParams<{ chain: string; pid: string }>()
  const { user } = useApi()
  const wssEndpointUrl = `${WSS_ENDPOINTS_URL}/${projectInfo[tabNum]?.chain}/${projectInfo[tabNum]?.pid}`
  const httpEndpointUrl = `${ENDPOINTS_URL}/${projectInfo[tabNum]?.chain}/${projectInfo[tabNum]?.pid}`

  const handleUpdateProjectName = async() => {
    return await apiUpdateProjectName({
      userId: user.id,
      chain: projectInfo[tabNum]?.chain,
      id: projectInfo[tabNum]?.id,
      name: nameRef.current!.value,
    }).then(
      () => {
        message.success(t('tip.updated'))
        return ''
      },
      (res) => {
        message.error(t('tip.fail'))
        return res.msg
      }
    )
  }

  const handleUpdateLimit = async() => {
    await apiUpdateProjectLimit({
      id: projectInfo[tabNum]?.id,
      reqDayLimit: Number(rateLimitRef.current!.value),
      reqSecLimit: Number(dailyRequsetRef.current!.value),
    }).then(() => {
      message.success(t('tip.updated'))
    }, (res) => {
      message.success(t('tip.fail'))
      return res.msg
    })
  }

  useEffect(() => {
    apiFetchProjectList(user.id, params.chain).then((res) => {
      setProjectInfo(res)
      const curIds = res.findIndex((info) => {
        return info.pid === params.pid
      })
      setTabNum(curIds > -1 ? curIds : 0)
    })
  }, [params.pid, params.chain, user.id])

  useEffect(() => {
    apiFetchProjectErrorStatics({
      page: 0,
      size: 10,
      chain: projectInfo[tabNum]?.chain,
      pid: projectInfo[tabNum]?.pid,
    }).then((res) => {
      // res.list = [
      //   {
      //     proto: 'wss',
      //     method: 'health',
      //     code: 200,
      //     delay: 2,
      //     time: '2020-01-01 23:22',
      //   },
      // ]
      setInvalidData(res)
    })
  }, [projectInfo, tabNum])

  return (
    <div className="projects">
      <CreateProjectBtn />
      <div className="projects-tabs">
        {projectInfo.map((data, index) => (
          <div
            key={data.name}
            className={`tab-item ${tabNum === index && 'active'}`}
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
              Created: {formatTime(projectInfo[tabNum]?.createdAt)}
            </div>
            <div className={`info-item team`}>
              Team: {projectInfo[tabNum]?.team}
            </div>
            <div className={`info-item network`}>
              Network: {projectInfo[tabNum]?.name}
            </div>
            <div className={`info-item ${projectInfo[tabNum]?.status}`}>
              Status: {projectInfo[tabNum]?.status}
            </div>
          </div>
          <div className="view-switch">
            <div
              className={`request ${viewType === 'request' && 'active'}`}
              onClick={() => {
                switchToView('request')
              }}
            >
              {t('Requests')}
            </div>
            <div
              className={`setting ${viewType === 'setting' && 'active'}`}
              onClick={() => {
                switchToView('setting')
              }}
            >
              {t('Settings')}
            </div>
          </div>
          {viewType === 'request' && (
            <div className="request-section">
              <div className="category">
                <OverviewCard title={t('dailyReq')}>
                  {projectInfo[tabNum]?.reqCnt}
                </OverviewCard>
                <OverviewCard title={t('dailyBandwidth')}>
                  {projectInfo[tabNum]?.bw}
                </OverviewCard>
                <OverviewCard title={t('AvgResTime')}>
                  {projectInfo[tabNum]?.timeoutDelay}
                </OverviewCard>
                <OverviewCard title={t('InvalidReq')}>
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
                    <Tooltip title={t('Click to copy')}>
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
                    <Tooltip title={t('Click to copy')}>
                      {projectInfo[tabNum]?.secret}
                    </Tooltip>
                  </div>
                </div>
                <div className="api-info">
                  <div className="title">Endpoints(WSS)</div>
                  <div className="value" onClick={() => copy(wssEndpointUrl)}>
                    <Tooltip title={t('Click to copy')}>
                      {wssEndpointUrl}
                    </Tooltip>
                  </div>
                </div>
                <div className="api-info">
                  <div className="title">Endpoints(HTTPS)</div>
                  <div className="value" onClick={() => copy(httpEndpointUrl)}>
                    <Tooltip title={t('Click to copy')}>
                      {httpEndpointUrl}
                    </Tooltip>
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
                <div className="title">
                  Recent Invalid / Rate Limited Requests
                </div>
                <div className="invalid-table">
                  <Table
                    dataSource={invalidData?.list}
                    columns={[
                      {
                        title: 'Method',
                        dataIndex: 'method',
                        key: 'method',
                      },
                      {
                        title: 'Error Code',
                        dataIndex: 'code',
                        key: 'code',
                      },
                      {
                        title: 'Response Time',
                        dataIndex: 'delay',
                        key: 'delay',
                      },
                      {
                        title: 'Time',
                        dataIndex: 'time',
                        key: 'time',
                      },
                    ]}
                  ></Table>
                </div>
              </div>
            </div>
          )}
          {viewType === 'setting' && (
            <div className="setting-section">
              <div className="setting-item">
                <div className="title">General Settings</div>
                <SettingField
                  ref={nameRef}
                  label={t('Details.projectName')}
                  tooltip={t('Details.maxChar')}
                  defaultValue={projectInfo[tabNum].name}
                  handleConfirm={handleUpdateProjectName}
                />
              </div>
              <div className="setting-item">
                <div className="title">Request Limiting</div>
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
                Delete Project
              </div>
            </div>
          )}
        </div>
      ) : null}
      <BasicModal
        title="Delete Project"
        visible={deleteModalVisible}
        okText={t('modal.delete')}
        onCancel={() => {
          setDeleteModalVisible(false)
        }}
        onOk={() => {
          setDeleteModalVisible(false)
        }}
      >
        { t("modal.deleteBody")}
      </BasicModal>
    </div>
  )
}

export default Projects
