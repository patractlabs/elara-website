import { FC, useState, useEffect } from 'react'
import { Table } from 'antd'
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
import { chainIconMap } from '../../core/types/classes/chain'

import './index.css'
import { formatTime } from '../../shared/utils'

const Overview: FC<{}> = () => {
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
  useEffect(() => {
    apiGetUserDailyStatics(user.id).then((res) => {
      setStatics(res)
    })
    apiFetchProjectList(user.id).then((res) => {
      setProjectList(res)
    })
  }, [])

  return (
    <div className="overview">
      <div className="category">
        <OverviewCard title={t('dailyReq')}>{statics.reqCnt}</OverviewCard>
        <OverviewCard title={t('dailyBandwidth')}>{statics.bw} MB</OverviewCard>
        <OverviewCard title={t('AvgResTime')}>{statics.delay} ms</OverviewCard>
        <OverviewCard title={t('InvalidReq')}>{statics.inReqCnt}</OverviewCard>
      </div>
      <div className="table-bar">
        <div className="total">
          {t('Project')} (<span className="count">{projectList.length}</span>
          /10)
        </div>
        <CreateProjectBtn />
      </div>
      <Table
        locale={{ emptyText: t('No Data') }}
        size="small"
        pagination={false}
        onRow={(project) => ({
          onClick: () =>
            history.push(`/dashboard/projects/${project.chain}/${project.pid}`),
        })}
        columns={[
          {
            title: t('Project'),
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
              <span style={{ color: '#14B071' }}>{text}</span>
            ),
          },
          {
            title: t('Team'),
            dataIndex: 'team',
            key: 'team',
            render: (data: string) => (
              <span className="td-span-default">{data}</span>
            ),
          },
          {
            title: t('Network'),
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
            title: t('dailyReq'),
            dataIndex: 'reqCnt',
            key: 'reqCnt',
            render: (data: number) => (
              <span style={{ fontWeight: 700 }}>{data}</span>
            ),
          },
          {
            title: t('dailyBandwidth'),
            dataIndex: 'bw',
            key: 'bw',
            render: (data: string) => (
              <div style={{ fontWeight: 700 }}>{data} M</div>
            ),
          },
          {
            title: t('Created'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (data: string) => formatTime(data),
          },
          {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render: (data: string) => (
              <div className={`table-status-item ${data}`}>{data}</div>
            ),
          },
        ]}
        dataSource={projectList}
      ></Table>
    </div>
  )
}

export default Overview
