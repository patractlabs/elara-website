import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import data from './data'
import './index.css'

export default function PageLoading() {
  const ref = useRef(null!)
  useEffect(() => {
    lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
    })
  }, [])
  return (
    <div className="elara-loading-container">
      <div className="elara-spin" ref={ref} />
    </div>
  )
}
