import { FC, useState, useCallback, useEffect } from 'react'
import { Table, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import EmptySample from '../../../shared/components/EmptySample'
import Pagination from '../../../shared/components/Pagination'
import { CountryTableDataExt } from '../../../core/types/classes/project'
import { apiFetchCountry } from '../../../core/data/api'

const CountryTable: FC<{ chain: string; pid: string }> = (props) => {
  const { chain, pid } = props
  const [countryData, setCountryData] = useState<CountryTableDataExt>()
  const { t } = useTranslation()

  const changeCountryStatics = useCallback(
    (page: number, size: number) => {
      apiFetchCountry({
        page,
        size,
        chain,
        pid,
      }).then((res) => {
        setCountryData(res)
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
            dataSource={countryData?.list}
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
          {countryData?.list && countryData?.list.length > 0 && (
            <Pagination
              total={100}
              onChange={(page, pageSize) => {
                changeCountryStatics(page-1, pageSize)
              }}
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  )
}

export default CountryTable
