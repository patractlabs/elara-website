import { FC, useState, useCallback, useEffect } from 'react'
import { Table, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import EmptySample from '../../../shared/components/EmptySample'
import Pagination from '../../../shared/components/Pagination'
import { CountryTableDataExt } from '../../../core/types/classes/project'
import { apiFetchCountry } from '../../../core/data/api'

const CountryTable: FC<{ chain: string; pid: string }> = (props) => {
  const { chain, pid } = props
  const [invalidData, setInvalidData] = useState<CountryTableDataExt>()
  const { t } = useTranslation()

  const changeCountryStatics = useCallback(
    (page: number, size: number) => {
      apiFetchCountry({
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
    changeCountryStatics(1, 10)
  }, [changeCountryStatics])

  return (
    <div className="stat-card">
      <div className="title">{t('Details.RequestByCountry')}</div>
      <div className="elara-table">
        <ConfigProvider
          renderEmpty={() => <EmptySample title="No data" height={232} />}
        >
          <Table
            scroll={{ y: 330 }}
            rowKey={(data) => data.country}
            dataSource={invalidData?.list}
            columns={[
              {
                title: t('Details.Country'),
                dataIndex: 'country',
                key: 'country',
              },
              {
                title: t('Details.Request'),
                dataIndex: 'request',
                key: 'request',
              },
              {
                title: t('Details.OfTotal'),
                dataIndex: 'percentage',
                key: 'percentage',
              },
            ]}
            pagination={false}
          ></Table>
          {invalidData?.list && invalidData?.list.length > 0 && (
            <Pagination
              total={100}
              onChange={(page, pageSize) => {
                changeCountryStatics(page, pageSize)
              }}
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  )
}

export default CountryTable
