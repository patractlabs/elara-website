import { FC } from 'react'

import EmptySvg from './images/empty.svg'
import './index.css'

const EmptySample: FC<{ title: string; height:number}> = ({ title, height }) => {
  return (
    <div className="empty-block" style={{ height: `${height}px` }}>
      <img src={EmptySvg} alt="无" className="empty-svg" />
      <span>{title}</span>
    </div>
  )
}

export default EmptySample