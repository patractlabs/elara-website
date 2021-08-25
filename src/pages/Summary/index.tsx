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
import { chainIconMap } from '../../core/types/classes/chain'

import './index.css'
import { formatTime } from '../../shared/utils'

const Summary: FC<{}> = () => {
  const [statics, setStatics] = useState<StatT>({
    bw: 0,
    reqCnt: 0,
    delay: 0,
    inReqCnt: 0,
  })
  const [projectList, setProjectList] = useState<Project[]>([])
  const { t } = useTranslation()
  const history = useHistory()
  const { user } = useApi()

  const updateProjetList = useCallback(() => {
    apiFetchProjectList(user.id).then((res) => {
      setProjectList(res)
    })
  }, [user.id])

  useEffect(() => {
    apiGetUserDailyStatics(user.id).then((res) => {
      setStatics(res)
    })
    updateProjetList()
  }, [user.id, updateProjetList])

  return (
    <div className="summary">
      <div className="category">
        <OverviewCard title={t('summary.dailyReq')}>
          {statics.reqCnt}
        </OverviewCard>
        <OverviewCard title={t('summary.dailyBandwidth')}>
          {statics.bw / 1000 > 1000
            ? `${(statics.bw / 1000000).toFixed(2)} MB`
            : `${(statics.bw / 1000).toFixed(2)} KB`}
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
          {t('Project')} (<span className="count">{projectList.length}</span>
          /10)
        </div>
        <CreateProjectBtn onCloseCallback={updateProjetList} />
      </div>
      <ConfigProvider
        renderEmpty={() => <EmptySample title="No data" height={352} />}
      >
        <Table
          className="summary-table"
          size="small"
          pagination={false}
          rowKey={(record) => record.id}
          onRow={(project) => ({
            onClick: () =>
              history.push({
                pathname: `/dashboard/projects/${project.chain}`,
                state: {
                  pid: project.pid,
                },
              }),
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
              render: (data: string) => (
                <div style={{ fontWeight: 700 }}>{data} M</div>
              ),
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
          ]}
          dataSource={projectList}
        ></Table>
      </ConfigProvider>
    </div>
  )
}

export default Summary
