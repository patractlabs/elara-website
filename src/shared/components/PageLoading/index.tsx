import { Spin } from 'antd'
import './index.css'

export default function PageLoading() {
  return (
    <div className="elara-loading-container">
      <Spin size="large" spinning={true} className="elara-spin" />
    </div>
  )
}
