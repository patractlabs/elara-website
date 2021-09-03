import { FC, ReactNode } from 'react'
import Tooltip from '../Tooltip'
import TooltipIcon from '../../../assets/tooltip.svg'

import './index.css'

const OverviewCard: FC<{
  title: ReactNode
  tooltip?: string
  percentageData?: {
    used: number
    limit: number
    onlyPercentage: boolean
    formatter?: Function
  }
}> = ({
  title = 'title',
  tooltip,
  percentageData = { used: 0, limit: -1, onlyPercentage: false },
  children,
}) => {
  const { used, limit, onlyPercentage, formatter } = percentageData
  return (
    <div className="summary-card">
      <div className="title">
        {title}
        {tooltip && (
          <Tooltip title={tooltip} bg={false}>
            <img
              src={TooltipIcon}
              alt="info"
              style={{
                width: '16px',
                height: '16px',
                marginLeft: '4px',
                cursor: 'pointer',
                verticalAlign: 'middle',
              }}
            />
          </Tooltip>
        )}
      </div>
      <div className="data">{children}</div>
      {percentageData && percentageData.limit > 0 && (
        <div className="indicator">
          <div className="usage">
            {onlyPercentage
              ? `${used / limit > 1 ? 100 : ((used / limit) * 100).toFixed(2)}%`
              : `${formatter ? formatter(limit) : limit} (${(
                  (used / limit) *
                  100
                ).toFixed(2)}%)`}
          </div>
          <div className="progress-bg">
            <span
              className="progress-indicator"
              style={{
                width: `${(used / limit) * 100}%`,
              }}
            ></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default OverviewCard
