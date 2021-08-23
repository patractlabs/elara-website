import { FC, useRef, useState, useEffect } from 'react'
import * as echarts from 'echarts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { apiFetchProjectMethodsStatics } from '../../../core/data/api'
import { CallMethodsDataExt } from '../../../core/types/classes/project'
import { RequestType } from '../../../core/enum'
import EmptySample from '../../../shared/components/EmptySample'

const CallMethodChart: FC<{ chain: string; pid: string }> = ({
  chain,
  pid,
}) => {
  const chartRef = useRef(null)
  const { t } = useTranslation()
  const [chartType, setChartType] =
    useState<keyof typeof RequestType>('bandwidth')
  const [chartData, setChartData] = useState<CallMethodsDataExt>({
    request: { total: 0, list: [] },
    bandwidth: { total: 0, list: [] },
  })

  // fetMixChartData
  useEffect(() => {
    apiFetchProjectMethodsStatics({ chain, pid }).then((res) => {
      setChartData(res)
    })
  }, [chain, pid])

  // setCurChartData
  useEffect(() => {
    if (chartData[chartType].list.length === 0) {
      return
    }

    let chartOptions = {}

    chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        right: '50px',
        left: '150px',
        bottom: '20px',
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: chartData![chartType].list.map((i) => i.method),
      },
      series: [
        {
          type: 'bar',
          data: chartData![chartType].list.slice().reverse().map((i, idx) => ({
            value: i.value,
            itemStyle: {
              color: `rgba(20,176,113, ${(idx + 1) * 0.3})`,
              borderRadius: [0, 20, 20, 0],
            },
            label: {
              show: 10,
              position: 'right',
            },
          })),
        },
      ],
    }
    const instance = echarts.init(chartRef.current!)
    instance.setOption(chartOptions)
  }, [chartData, chartType])

  return (
    <div className="methods-chart stat-card">
      <div className="title">
        {t('Details.TopCall')}
        <span>({t('Details.Last30days')})</span>
      </div>
      <div className="top-bar">
        <Radio.Group
          onChange={(e) => {
            setChartType(e.target.value)
          }}
          value={chartType}
        >
          <Radio value={RequestType.request}>{t('Details.Request')}</Radio>
          <Radio value={RequestType.bandwidth}>{t('Details.Bandwidth')}</Radio>
        </Radio.Group>
      </div>
      {chartData && chartData![chartType].list.length > 0 ? (
        <div ref={chartRef} style={{ height: '334px' }}></div>
      ) : (
        <EmptySample height={232} title="No data" />
      )}
    </div>
  )
}

export default CallMethodChart
