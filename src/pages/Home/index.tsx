import React, { ReactElement, useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';
import "./index.css";
import { apiGetChainStats, apiGetRequestsByDate } from '../../core/data/api'
import { useTranslation } from "react-i18next";
import img1 from '../../assets/easy-use.webp';
import img2 from '../../assets/cp2.svg';
import img3 from '../../assets/multi-chain.webp';
import img4 from '../../assets/cp4.svg';
import img5 from '../../assets/all-network.svg';
import img6 from '../../assets/request.svg';
import img7 from '../../assets/projects.svg';
import img8 from '../../assets/sv4.svg';
import { Language } from '../../core/enum';
import { useApi } from '../../core/hooks/useApi';
import { LoginModal } from '../../shared/components/LoginModal';
import { useHistory } from 'react-router';
import { Carousel } from 'antd';
import Footer from '../Footer';
import { Countup } from '../../shared/components/Countup';

const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
];

const requestOption: any = {
  xAxis: {
    type: "category",
    data: [],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: "value",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#283b56",
        precision: 0
      },
    },
  },
  series: [
    {
      data: [],
      type: "bar",
      itemStyle: {
        color: "#14B071",
      },
    },
  ],
};

const Home: React.FC = (): ReactElement => {
  const [ isLoginModalVisible, setLoginModalVisible ] = useState(false);
  const [ total, setTotal ] = useState(0);
  const [ loaded, setLoaded ] = useState<boolean>(false);
  const requestsEchart = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { isLogged, homeHeight } = useApi();
  const { t, i18n } = useTranslation();
  const carousel = useRef<any>(null);

  const gotoDashboard = () => {
    if (!isLogged) {
      return setLoginModalVisible(true);
    }
    history.push("/dashboard/projects");
  };

  useEffect(() => {
    window.scrollTo({ top: homeHeight.height });
  }, [homeHeight.height]);

  useEffect(() => {
    setLoaded(true);
    apiGetChainStats()
      .then(chainStatus =>
        setTotal(
          Object.keys(chainStatus)
            .reduce((sum, current) => sum + Number(chainStatus[current]), 0)
        )
      );
    const timer = setInterval(() => {
      apiGetChainStats()
        .then(chainStatus =>
          setTotal(
            Object.keys(chainStatus)
              .reduce((sum, current) => sum + Number(chainStatus[current]), 0)
          )
        );
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    apiGetRequestsByDate(30).then(res=>{
      const keys = Object.keys(res);
      
      requestOption.xAxis.data = keys.map(s => s.slice(4,6) + "-" + s.slice(6));
      requestOption.series[0].data = keys.map(key => res[key]);

      const chart = echarts.init(requestsEchart.current!);
      chart.setOption(requestOption);
    })
  }, [])
  
  useEffect(() => {
    if (!carousel.current) {
      return;
    }
    const timer = setInterval(() => carousel.current.next(), 2500);
    return () => clearInterval(timer);
  }, [carousel]);

  return (
    <div className="Home" id="Home">
      <div className="Home_banner animated fadeInLeft">
        <div className={ loaded ? 'banner-img banner-img1 banner-img1-animation' : 'banner-img banner-img1' } ></div>
        <div className="banner-title-holder">
          {
            i18n.language === Language.zh ?
              <h3 className="banner_title1" style={{ paddingTop: '126px' }}>波卡生态的公共API接入服务</h3>
              :
              <h3 className="banner_title1" style={{ paddingTop: '70px' }}>
                <span>Public API Access Service for</span><br/>
                <span>Polkadot Ecosystem</span>
              </h3>
          }
          <h5 className="banner_title2"> {t("bannerTitle2")} </h5>
        </div>
        <div className={ loaded ? 'banner-img banner-img2 banner-img2-animation' : 'banner-img banner-img2' } ></div>

        <div className="banner-center-holder">
          <span className="countup-title">
            {t('Cumulative')}
          </span>
          <span className="countup">
            <Countup number={total} />
          </span>
          <div ref={requestsEchart} style={{ width: '80%', height: '255px' }}/>
          <div className="active-btn" onClick={gotoDashboard}>
            {t("bannerBtn")}
          </div>
        </div>
      </div>

      <div className="advantage-holder animated fadeInRight">
        <div className="advantage-row">
          <div className="advantage">
            <img src={imgList[0]} alt="" />
            <h4>{t("Easy")}</h4>
            <p>{t("NoNeed")} </p>
          </div>
          <div className="advantage">
            <img src={imgList[1]} alt="" />
            <h4>{t("Stable")}</h4>
            <p>{t("ElaraHandles")}</p>
          </div>
        </div>
        <div className="advantage-row">
          <div className="advantage">
            <img src={imgList[2]} alt="" />
            <h4>{t("Rich")}</h4>
            <p>{t("Ourhighly")}</p>
          </div>
          <div className="advantage">
            <img src={imgList[3]} alt="" />
            <h4>{t("Customer")}</h4>
            <p>{t("WeProvide")}</p>
          </div>
        </div>
      </div>

      <div className="product" id="home-product">
        <h2>
          {t('We provide you')}
        </h2>
        <div className="product-main">
          <div className="product-left"></div>
          <div style={{ position: 'absolute', left: '240px', right: '240px', height: '327px' }}>
            <Carousel ref={carousel}>
              <div>
                <div className="autoplay-content">
                  <div className="all-chain">
                    { t('All networks in the Polkadot ecosystem') }
                  </div>
                </div>
              </div>
              <div>
                <div className="autoplay-content">
                  {
                    i18n.language === Language.zh &&
                      <p className="product-tip">每个账户每天</p>
                  }
                  <p className="product-text">1,000,000</p>
                  <p className="product-tip">
                    {
                      i18n.language === Language.zh ?
                        '次请求'
                        :
                        'Requests for every account every day'
                    }
                  </p>
                </div>
              </div>
              <div>
                <div className="autoplay-content">
                  <p className="product-text">{ t('10 Projects') }</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="product-right"></div>
        </div>
        <div onClick={gotoDashboard} className="black-btn">{t('bannerBtn')}</div>
      </div>
      
      <Footer />
      <LoginModal isModalVisible={isLoginModalVisible} onModalClose={() => setLoginModalVisible(false)} />
    </div>
  );
};

export default Home;
