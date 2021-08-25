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
    useState<keyof typeof RequestType>('request')
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
        textStyle: {
          color: '#616460',
          fontSize: 12,
          textBorderWidth: 2,
          fontWeight: 'bolder',
        },
        extraCssText:
          'box-shadow: 0px 4px 32px 0px rgba(0,0,0,0.20); padding: 8px 12px',
        formatter: function (param: any) {
          if (chartType === 'bandwidth') {
            const kbVal = param[0].data.value
            let res =
              kbVal > 1000
                ? (kbVal / 1000).toFixed(2) + ' MB'
                : kbVal.toFixed(2) + ' KB'
            return `${param[0].axisValue} <br/> ${res}`
          } else {
            return `${param[0].axisValue} <br/> ${param[0].data.value}`
          }
        },
      },
      grid: {
        top: '20px',
        right: '50px',
        left: '150px',
        bottom: '20px',
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#7C7E7C',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: chartData![chartType].list.map((i) => i.method),
        axisLabel: {
          margin: 16,
          color: '#7c7e7c',
          fontSize: 12,
          width: 140,
          overflow: 'truncate',
          ellipsis: true,
        },
        axisLine: {
          lineStyle: {
            color: '#7c7e7c',
          },
        },
        axisTick: {
          length: 8,
          lineStyle: {
            color: '#7c7e7c',
          },
        },
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          data: chartData![chartType].list
            .slice()
            .reverse()
            .map((i, idx) => {
              return {
                value: chartType === 'bandwidth' ? i.value / 1000 : i.value,
                itemStyle: {
                  color: `rgba(20,176,113, ${(idx + 1) * 0.3})`,
                  borderRadius: [0, 20, 20, 0],
                },
              }
            }),
          label: {
            show: 10,
            position: 'right',
            distance: 12,
            fontWeight: 'bolder',
            color: "#616460",
            formatter: function (params: any) {
              const val = params.data.value
              if (chartType === 'bandwidth') {
                return val > 1000
                  ? (val / 1000).toFixed(2) + ' MB'
                  : val.toFixed(2) + ' KB'
              } else {
                return val
              }
            },
          },
        },
      ],
    }
    const instance = echarts.init(chartRef.current!)
    instance.setOption(chartOptions)
    instance.resize({ height: chartData[chartType].list.length * 30 + 50 })
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
        <div ref={chartRef} style={{ height: chartData[chartType].list.length * 30 + 50 }}></div>
      ) : (
        <EmptySample height={232} title="No data" />
      )}
    </div>
  )
}

export default CallMethodChart
