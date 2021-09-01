import { FC, ReactNode } from 'react'

import './index.css'

const OverviewCard: FC<{ title: ReactNode }> = ({
  title = 'title',
  children,
}) => {
  return (
    <div className="summary-card">
      <div className="title">{title}</div>
      <div className="data">{children}</div>
    </div>
  )
}

export default OverviewCard
