import { FC, useRef, useState, useEffect } from 'react'
import * as echarts from 'echarts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { apiFetchProjectStaticsOfRange } from '../../../core/data/api'
import { RangeChartData } from '../../../core/types/classes/project'
import { RequestType } from '../../../core/enum'
import EmptySample from '../../../shared/components/EmptySample'

enum rangeEnum {
  '24hours' = '24-hours',
  '7days' = '7-days',
  '30days' = '30-days',
}

const BandwidthMixChart: FC<{ chain: string; pid: string }> = ({
  chain,
  pid,
}) => {
  const reqBandwidthEchart = useRef(null)
  const unMount = useRef(false)
  const { t } = useTranslation()
  const [chartType, setChartType] =
    useState<keyof typeof RequestType>('bandwidth')
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
      if (!unMount.current) setMixChartData(res)
    })
    return () => {
      unMount.current = true
    }
  }, [chain, pid, chartRange])

  useEffect(() => {
    const hasData = mixChartData.stats
      .map((i) => i[chartType])
      .some((data) => data !== 0)
    if (!hasData) {
      return
    }
    let reqBandwidthEchartOptions = {}
    const [_, rangeType] = chartRange.split('-')
    const xAxis = mixChartData.timeline.map((data) => {
      if (rangeType === 'hours') {
        const [_, t] = data.split(' ')
        return t
      } else {
        const [_, m, d] = data.split('-')
        return `${m}-${d}`
      }
    })

    reqBandwidthEchartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: xAxis?.reverse(),
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        // axisLabel: {
        //   inside: true,
        // },
      },
      grid: {
        right: '10',
        left: '50',
        bottom: '20',
      },
      series: [
        {
          data: mixChartData.stats.map((i) => i[chartType]).reverse(),
          type: 'bar',
          itemStyle: {
            color: '#EFEFEF',
          },
          tooltip: {
            trigger: 'none',
          },
        },
        {
          data: mixChartData.stats.map((i) => i[chartType]).reverse(),
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: '#14B071',
          },
          lineStyle: {
            width: 4,
          },
          tooltip: {
            trigger: 'axis',
            position: 'top',
            backgroundColor: '#fff',
            borderColor: '#fff',
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
