import { FC, useRef, useState, useEffect } from 'react'
import * as echarts from 'echarts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { apiFetchProjectStaticsOfRange } from '../../../core/data/api'
import { RangeChartData } from '../../../core/types/classes/project'
import { RequestType } from '../../../core/enum'
import EmptySample from '../../../shared/components/EmptySample'
import { formatBandwidth } from '../../../shared/utils/index'

enum rangeEnum {
  '24hours' = '24-hours',
  '7days' = '7-days',
  '30days' = '30-days',
}

const BandwidthMixChart: FC<{
  chain: string
  pid: string
  timestamp: number
}> = ({ chain, pid, timestamp }) => {
  const reqBandwidthEchart = useRef(null)
  const { t } = useTranslation()
  const [chartType, setChartType] =
    useState<keyof typeof RequestType>('request')
  const [chartRange, setChartRange] = useState('24-hours')
  const [mixChartData, setMixChartData] = useState<RangeChartData>({
    timeline: [],
    stats: [],
  })

  // fetMixChartData
  useEffect(() => {
    const [rangeValue, rangeType] = chartRange.split('-')
    apiFetchProjectStaticsOfRange(
      { chain, pid, [rangeType]: Number(rangeValue) },
      rangeType
    ).then((res) => {
      setMixChartData({ ...res })
    })
  }, [chain, pid, chartRange, timestamp])

  useEffect(() => {
    console.log('render')

    const hasData = mixChartData.stats
      .map((i) => i[chartType])
      .some((data) => data !== 0)
    if (!hasData) {
      return
    }
    let reqBandwidthEchartOptions = {}
    reqBandwidthEchartOptions = {
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
        formatter: function (param: { data: number; axisValue: string }[]) {
          if (chartType === 'bandwidth') {
            const kbVal = param[0].data
            return `${param[0].axisValue} <br/> ${formatBandwidth(
              kbVal * 1000
            )}`
          } else {
            return `${param[0].axisValue} <br/> ${param[0].data}`
          }
        },
      },
      xAxis: {
        type: 'category',
        data: mixChartData.timeline.slice().reverse(),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          show: true,
          formatter: function (value: string) {
            if (chartRange === rangeEnum['24hours']) return value.slice(6)
            return value.slice(5)
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        right: '10',
        left: '50',
        bottom: '20',
      },
      series: [
        {
          data: mixChartData.stats
            .map((i) => {
              if (chartType === 'bandwidth') return i[chartType] / 1000
              return i[chartType]
            })
            .slice()
            .reverse(),
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: '#14B071',
          },
          lineStyle: {
            width: 4,
          },
        },
        {
          data: mixChartData.stats
            .map((i) => {
              if (chartType === 'bandwidth') return i[chartType] / 1000
              return i[chartType]
            })
            .slice()
            .reverse(),
          type: 'bar',
          itemStyle: {
            color: '#EFEFEF',
          },
          tooltip: {
            trigger: 'none',
          },
        },
      ],
    }
    const reqBandwidthEchartInstance = echarts.init(reqBandwidthEchart.current!)
    reqBandwidthEchartInstance.setOption(reqBandwidthEchartOptions)
  }, [chartType, chartRange, mixChartData])

  return (
    <div className="req-bandwidth-chart stat-card">
      <div className="title">{t('Details.RequestAndBandwidth')}</div>
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
        <Radio.Group
          onChange={(e) => {
            setChartRange(e.target.value)
          }}
          value={chartRange}
        >
          <Radio value={rangeEnum['24hours']}>24 {t('Details.Hrs')}</Radio>
          <Radio value={rangeEnum['7days']}>7 {t('Details.Days')}</Radio>
          <Radio value={rangeEnum['30days']}>30 {t('Details.Days')}</Radio>
        </Radio.Group>
      </div>
      {mixChartData.stats &&
      mixChartData?.stats
        .map((i) => i[chartType])
        .every((data) => data === 0) ? (
        <EmptySample height={232} title="No data" />
      ) : (
        <div ref={reqBandwidthEchart} style={{ height: '334px' }}></div>
      )}
    </div>
  )
}

export default BandwidthMixChart
