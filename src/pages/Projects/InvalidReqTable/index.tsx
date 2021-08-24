import { FC, useState, useCallback, useEffect } from 'react'
import { Table, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import EmptySample from '../../../shared/components/EmptySample'
import Pagination from '../../../shared/components/Pagination'
import { InvalidTableDataExt } from '../../../core/types/classes/project'
import { apiFetchProjectErrorStatics } from '../../../core/data/api'

const InvalidReqTable: FC<{ chain: string; pid: string }> = (props) => {
  const { chain, pid } = props
    const [invalidData, setInvalidData] = useState<InvalidTableDataExt>()
    const { t } = useTranslation()

  const changeProjectErrorStatics = useCallback(
    (page: number, size: number) => {
      apiFetchProjectErrorStatics({
        page,
        size,
        chain,
        pid,
      }).then((res) => {
          setInvalidData(res) 
      })
    },
    [chain, pid]
  )

  useEffect(() => {
    changeProjectErrorStatics(0, 10)
  }, [changeProjectErrorStatics])

  return (
    <div className="stat-card">
      <div className="title">{t('Details.invalidLimitReqs')}</div>
      <div className="elara-table">
        <ConfigProvider
          renderEmpty={() => <EmptySample title="No data" height={232} />}
        >
          <Table
            rowKey={(data) => data.time}
            dataSource={invalidData?.list}
            scroll={{ y: 330 }}
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
              total={invalidData.total}
              onChange={(page, pageSize) => {
                changeProjectErrorStatics(page-1, pageSize)
              }}
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  )
}

export default InvalidReqTable
