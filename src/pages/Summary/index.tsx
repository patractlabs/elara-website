import { FC, useState, useEffect, useCallback } from 'react'
import { Table, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {
  apiFetchProjectList,
  apiGetUserDailyStatics,
} from '../../core/data/api'
import { useApi } from '../../core/hooks/useApi'
import { StatT } from '../../core/types/classes/stat'
import { Project } from '../../core/types/classes/project'
import OverviewCard from '../../shared/components/OverviewCard'
import CreateProjectBtn from '../../shared/components/CreateProjectBtn'
import EmptySample from '../../shared/components/EmptySample'
import EmptyByDesc from '../../shared/components/EmptyByDesc'
import { chainIconMap } from '../../core/types/classes/chain'
import MoreSvg from '../../assets/arrow_forward.svg'
import Tooltip from '../../shared/components/Tooltip'
import PageLoading from '../../shared/components/PageLoading'

import './index.css'
import { formatTime, formatSize } from '../../shared/utils'

const Summary: FC<{}> = () => {
  const [statics, setStatics] = useState<StatT>({
    bw: 0,
    reqCnt: 0,
    delay: 0,
    inReqCnt: 0,
  })
  const [projectList, setProjectList] = useState<Project[]>([])
  const [rowActive, setRowActive] = useState(-1)
  const [loading, setloading] = useState(true)
  const { t } = useTranslation()
  const history = useHistory()
  const { user } = useApi()

  const updateProjetList = useCallback(() => {
    apiFetchProjectList(user.id).then((res) => {
      setProjectList(res)
      setloading(false)
    })
  }, [user.id])

  useEffect(() => {
    apiGetUserDailyStatics(user.id).then((res) => {
      setStatics(res)
    })
    updateProjetList()
  }, [user.id, updateProjetList])

  return !loading ? (
    <div className="summary">
      <div className="category">
        <OverviewCard
          title={t('summary.dailyBandwidth')}
          tooltip={t('tip.MaxBandwidth')}
          percentageData={{
            used: statics.bw,
            limit: user.bwDayLimit,
            onlyPercentage: true,
          }}
        >
          {formatSize(statics.bw)}
        </OverviewCard>
        <OverviewCard
          tooltip={t('tip.MaxRequest')}
          title={t('summary.dailyReq')}
          percentageData={{
            used: statics.reqCnt,
            limit: user.reqDayLimit,
            onlyPercentage: false,
          }}
        >
          {statics.reqCnt}
        </OverviewCard>
        <OverviewCard title={t('summary.AvgResTime')}>
          {statics.delay} ms
        </OverviewCard>
        <OverviewCard title={t('summary.InvalidReq')}>
          {statics.inReqCnt}
        </OverviewCard>
      </div>
      <div className="table-bar">
        <div className="total">
          {t('Project')} (
          <Tooltip title={t('tip.MaxNum')} bg={false}>
            <span className="count">{projectList.length}</span>/
            {user.maxProjectNum})
          </Tooltip>
        </div>
        {projectList.length > 0 && (
          <CreateProjectBtn onCloseCallback={updateProjetList} />
        )}
      </div>
      {projectList.length > 0 ? (
        <ConfigProvider
          renderEmpty={() => <EmptySample title="No data" height={352} />}
        >
          <Table
            className="summary-table"
            size="small"
            pagination={false}
            rowKey={(record) => record.id}
            rowClassName={(record, index) =>
              index === rowActive ? 'rowActive' : ''
            }
            onRow={(project, index) => ({
              onClick: () =>
                history.push({
                  pathname: `/dashboard/projects/${project.chain}`,
                  state: {
                    pid: project.pid,
                  },
                }),
              onMouseEnter: () => {
                setRowActive(index ?? -1)
              },
              onMouseLeave: () => {
                setRowActive(-1)
              },
            })}
            columns={[
              {
                title: t('summary.Project'),
                dataIndex: 'name',
                key: 'name',
                render: (text: string) => (
                  <span style={{ color: '#14B071' }}>{text}</span>
                ),
              },
              {
                title: t('summary.Team'),
                dataIndex: 'team',
                key: 'team',
                render: (data: string) => (
                  <span className="td-span-default">{data}</span>
                ),
              },
              {
                title: t('summary.Network'),
                dataIndex: 'chain',
                key: 'chain',
                render: (data: keyof typeof chainIconMap) => (
                  <span className="table-chain-item">
                    <img src={chainIconMap[data]} alt="" />
                    {data}
                  </span>
                ),
              },
              {
                title: t('summary.dailyReq'),
                dataIndex: 'reqCnt',
                key: 'reqCnt',
                render: (data: number) => (
                  <span style={{ fontWeight: 700 }}>{data}</span>
                ),
              },
              {
                title: t('summary.dailyBandwidth'),
                dataIndex: 'bw',
                key: 'bw',
                render: (data: number) => {
                  return (
                    <div style={{ fontWeight: 700 }}>{formatSize(data)}</div>
                  )
                },
              },
              {
                title: t('summary.Created'),
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (data: string) => formatTime(data),
              },
              {
                title: t('summary.Status'),
                dataIndex: 'status',
                key: 'status',
                render: (data: string) => (
                  <div className={`table-status-item ${data}`}>{data}</div>
                ),
              },
              {
                title: '',
                dataIndex: 'operation',
                width: 20,
                render: (data, record, index) =>
                  index === rowActive ? (
                    <img src={MoreSvg} alt="more" />
                  ) : (
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        display: 'block',
                      }}
                    ></span>
                  ),
              },
            ]}
            dataSource={projectList}
          ></Table>
        </ConfigProvider>
      ) : (
        <EmptyByDesc
          CreateBtn={<CreateProjectBtn onCloseCallback={updateProjetList} />}
        />
      )}
    </div>
  ) : (
    <PageLoading />
  )
}

export default Summary
