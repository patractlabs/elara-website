import React, { ReactElement, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import './index.css'
import { LimitData } from '../../core/types/classes/stat'
import {
  apiGetTotalStatics,
  apiGetLast30DaysRequests,
  apiGetPublicSetting,
} from '../../core/data/api'
import { useTranslation } from 'react-i18next'
import img1 from '../../assets/easy-use.webp'
import img2 from '../../assets/cp2.svg'
import img3 from '../../assets/multi-chain.webp'
import img4 from '../../assets/cp4.svg'
import img5 from '../../assets/all-network.svg'
import img6 from '../../assets/request.svg'
import img7 from '../../assets/projects.svg'
import img8 from '../../assets/sv4.svg'
import { Language } from '../../core/enum'
import { useApi } from '../../core/hooks/useApi'
import { LoginModal } from '../../shared/components/LoginModal'
import { useHistory } from 'react-router'
import { Carousel } from 'antd'
import Footer from '../Footer'
import { Countup } from '../../shared/components/Countup'
import { formatSize, formatNumber } from '../../shared/utils'

const imgList = [img1, img2, img3, img4, img5, img6, img7, img8]

const Home: React.FC = (): ReactElement => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const [total, setTotal] = useState({ request: 0, bandwidth: 0 })
  const [limit, setLimit] = useState<LimitData>({
    bwDayLimit: 0,
    projectNum: 0,
  })
  const [loaded, setLoaded] = useState<boolean>(false)
  const [chartType, setChartType] = useState<'request' | 'bandwidth'>(
    'bandwidth'
  )
  const requestsEchart = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const { isLogged, homeHeight } = useApi()
  const { t, i18n } = useTranslation()
  const carousel = useRef<any>(null)

  const gotoDashboard = () => {
    if (!isLogged) {
      return setLoginModalVisible(true)
    }
    history.push('/dashboard/summary')
  }

  useEffect(() => {
    window.scrollTo({ top: homeHeight.height })
    apiGetPublicSetting().then((data) => {
      setLimit(data)
    })
  }, [homeHeight.height])

  useEffect(() => {
    setLoaded(true)
    apiGetTotalStatics().then((data) => {
      setTotal(data)
    })
    const timer = setInterval(() => {
      apiGetTotalStatics().then((data) => setTotal(data))
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    apiGetLast30DaysRequests().then((res) => {
      const requestOption: any = {
        xAxis: {
          type: 'category',
          data: res.timeline.map((i) => i.slice(5)).reverse(),
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value: number) {
              if (chartType === 'request') return formatNumber(value)
              return formatSize(value)
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              backgroundColor: '#283b56',
              precision: 0,
            },
          },
          textStyle: {
            color: '#616460',
            fontSize: 12,
            textBorderWidth: 2,
            fontWeight: 'bolder',
          },
          formatter: function (data: { value: number; axisValue: string }[]) {
            if (chartType === 'request')
              return `${data[0].axisValue}<br>${formatNumber(data[0].value)}`
            return `${data[0].axisValue}<br>${formatSize(data[0].value)}`
          },
          extraCssText:
            'box-shadow: 0px 4px 32px 0px rgba(0,0,0,0.20); padding: 8px 12px',
        },
        grid: {
          right: '100',
          left: '100',
          bottom: '20',
        },
        series: [
          {
            data: res.stats.map((i) => i[chartType]).reverse(),
            type: 'bar',
            itemStyle: {
              color: '#14B071',
            },
          },
        ],
      }
      if (requestsEchart.current) {
        const chart = echarts.init(requestsEchart.current)
        chart.setOption(requestOption)
      }
    })
  }, [chartType])

  useEffect(() => {
    if (!carousel.current) {
      return
    }
    const timer = setInterval(() => carousel.current.next(), 2500)
    return () => clearInterval(timer)
  }, [carousel])

  return (
    <div className="Home" id="Home">
      <div className="Home_banner animated fadeInLeft">
        <div
          className={
            loaded
              ? 'banner-img banner-img1 banner-img1-animation'
              : 'banner-img banner-img1'
          }
        ></div>
        <div className="banner-title-holder">
          {i18n.language === Language.zh ? (
            <h3 className="banner_title1" style={{ paddingTop: '126px' }}>
              波卡生态的公共API接入服务
            </h3>
          ) : (
            <h3 className="banner_title1" style={{ paddingTop: '70px' }}>
              <span>Public API Access Service for</span>
              <br />
              <span>Polkadot Ecosystem</span>
            </h3>
          )}
          <h5 className="banner_title2"> {t('bannerTitle2')} </h5>
        </div>
        <div
          className={
            loaded
              ? 'banner-img banner-img2 banner-img2-animation'
              : 'banner-img banner-img2'
          }
        ></div>
        <div className="countup-contanier">
          <div
            className="countup-section"
            onClick={() => setChartType('bandwidth')}
          >
            <span
              className={`countup-title ${
                chartType === 'bandwidth' ? 'active' : ''
              }`}
            >
              {t('TotalBandwidth')}
            </span>
            <span className="countup">
              <Countup
                number={Math.floor(total.bandwidth / Math.pow(1024, 3))}
              />
              GB
            </span>
          </div>
          <div
            className="countup-section"
            onClick={() => setChartType('request')}
          >
            <span
              className={`countup-title ${
                chartType === 'request' ? 'active' : ''
              }`}
            >
              {t('Cumulative')}
            </span>
            <span className="countup">
              <Countup number={total.request} />
            </span>
          </div>
        </div>
        <div className="banner-center-holder">
          <div
            ref={requestsEchart}
            style={{ width: '900px', height: '355px' }}
          />
          <div className="active-btn" onClick={gotoDashboard}>
            {t('bannerBtn')}
          </div>
        </div>
      </div>

      <div className="advantage-holder animated fadeInRight">
        <div className="advantage-row">
          <div className="advantage">
            <img src={imgList[0]} alt="" />
            <h4>{t('Easy')}</h4>
            <p>{t('NoNeed')} </p>
          </div>
          <div className="advantage">
            <img src={imgList[1]} alt="" />
            <h4>{t('Stable')}</h4>
            <p>{t('ElaraHandles')}</p>
          </div>
        </div>
        <div className="advantage-row">
          <div className="advantage">
            <img src={imgList[2]} alt="" />
            <h4>{t('Rich')}</h4>
            <p>{t('Ourhighly')}</p>
          </div>
          <div className="advantage">
            <img src={imgList[3]} alt="" />
            <h4>{t('Customer')}</h4>
            <p>{t('WeProvide')}</p>
          </div>
        </div>
      </div>

      <div className="product" id="home-product">
        <h2>{t('We provide you')}</h2>
        <div className="product-main">
          <div className="product-left"></div>
          <div
            style={{
              position: 'absolute',
              left: '240px',
              right: '240px',
              height: '327px',
            }}
          >
            <Carousel ref={carousel}>
              <div>
                <div className="autoplay-content">
                  <div className="all-chain">
                    {t('All networks in the Polkadot ecosystem')}
                  </div>
                </div>
              </div>
              <div>
                <div className="autoplay-content">
                  {i18n.language === Language.zh && (
                    <p className="product-tip">每天每个账户</p>
                  )}
                  <p className="product-text">
                    {Math.floor(limit.bwDayLimit / Math.pow(1000, 3)) || 10} GB
                  </p>
                  <p className="product-tip">
                    {i18n.language === Language.zh
                      ? '高速带宽'
                      : 'Bandwidth for every account every day'}
                  </p>
                </div>
              </div>
              <div>
                <div className="autoplay-content">
                  <p className="product-text">
                    {limit.projectNum || 10}
                    {t('Projects')}
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="product-right"></div>
        </div>
        <div onClick={gotoDashboard} className="black-btn">
          {t('bannerBtn')}
        </div>
      </div>

      <Footer />
      <LoginModal
        isModalVisible={isLoginModalVisible}
        onModalClose={() => setLoginModalVisible(false)}
      />
    </div>
  )
}

export default Home
