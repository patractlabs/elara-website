import { FC, useState, useCallback, useEffect, useRef } from 'react'
import { Table, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import EmptySample from '../../../shared/components/EmptySample'
import Pagination from '../../../shared/components/Pagination'
import { InvalidTableDataExt } from '../../../core/types/classes/project'
import { apiFetchProjectErrorStatics } from '../../../core/data/api'

const InvalidReqTable: FC<{ chain: string; pid: string }> = (props) => {
  const { chain, pid } = props
    const [invalidData, setInvalidData] = useState<InvalidTableDataExt>()
    const unMount = useRef(false)
    const { t } = useTranslation()

  const changeProjectErrorStatics = useCallback(
    (page: number, size: number) => {
      apiFetchProjectErrorStatics({
        page,
        size,
        chain,
        pid,
      }).then((res) => {
          if (!unMount.current) setInvalidData(res)
      })
    },
    [chain, pid]
  )

  useEffect(() => {
    changeProjectErrorStatics(1, 10)
    return () => {unMount.current = true}
  }, [changeProjectErrorStatics])

  return (
    <div className="requsets-chart stat-card">
      <div className="title">{t('Details.invalidLimitReqs')}</div>
      <div className="invalid-table">
        <ConfigProvider
          renderEmpty={() => <EmptySample title="No data" height={232} />}
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
                changeProjectErrorStatics(page, pageSize)
              }}
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  )
}

export default InvalidReqTable
