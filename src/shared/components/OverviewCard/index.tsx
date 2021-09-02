import { FC, ReactNode } from 'react'

import './index.css'

const OverviewCard: FC<{
  title: ReactNode
  percentageData?: { used: number; limit: number; onlyPercentage: boolean }
}> = ({
  title = 'title',
  percentageData = { used: 0, limit: -1, onlyPercentage: false },
  children,
}) => {
  const { used, limit, onlyPercentage } = percentageData
  return (
    <div className="summary-card">
      <div className="title">{title}</div>
      <div className="data">{children}</div>
      {percentageData && percentageData.limit > 0 && (
        <div className="indicator">
          <div className="usage">
            {onlyPercentage
              ? `${used / limit > 1 ? 100 : ((used / limit) * 100).toFixed(2)}%`
              : `${used} (${((used / limit) * 100).toFixed(2)}%)`}
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
