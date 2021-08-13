import { FC, useRef, useState, useEffect } from 'react'
import * as echarts from 'echarts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { apiFetchProjectMethodsStatics } from '../../../core/data/api'
import { CallMethodsDataExt} from '../../../core/types/classes/project'
import { RequestType } from '../../../core/enum'


const BandwidthMixChart: FC<{ chain: string; pid: string }> = ({
  chain,
  pid,
}) => {
  const chartRef = useRef(null)
  const { t } = useTranslation()
  const [chartType, setChartType] =
    useState<keyof typeof RequestType>('bandwidth')
  const [chartData, setChartData] = useState<CallMethodsDataExt>()

  // fetMixChartData
  useEffect(() => {
    apiFetchProjectMethodsStatics(
      { chain, pid,  },
    ).then((res) => {
      setChartData(res)
    })
  }, [chain, pid])

  // setCurChartData
  useEffect(() => {
    let chartOptions = {}
    
    chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        right: '10px',
        left: '40',
        bottom: '20px',
      },
      xAxis: {
        type: 'value',
        // boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        // data: chartData![chartType].list.map((i) => i.method),
        data: ['post', 'a', 'b', 'c'],
      },
      series: [
        {
          name: '2011年',
          type: 'bar',
          // data: chartData![chartType].list.map((i) => i.value),
          data: [1, 2, 5, 2].map((v, index) => ({
            value: v,
            itemStyle: {
              color: `rgba(20,176,113,${(1 + index) * 0.2})`,
              borderRadius: [0, 10, 10, 0],
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
          <Radio value={RequestType.request}>Request</Radio>
          <Radio value={RequestType.bandwidth}>Bandwidth</Radio>
        </Radio.Group>
      </div>
      <div ref={chartRef} style={{ height: '334px' }}></div>
    </div>
  )
}

export default BandwidthMixChart
