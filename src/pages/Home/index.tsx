import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import { apiGetChainStats } from "../../core/data/api";
import CountUp from "react-countup";
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

const countUpProps = {
  star: 0,
  duration: 2.75,
  decimals: 0,
  useEasing: true,
  useGrouping: true,
  separator: ",",
};
const Home: React.FC = (): ReactElement => {
  const [ isLoginModalVisible, setLoginModalVisible ] = useState(false);
  const [ total, setTotal ] = useState(0);
  const [ loaded, setLoaded ] = useState<boolean>(false);
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
  }, []);

  
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
              <h3 className="banner_title1">波卡生态的公共API接入服务</h3>
              :
              <h3 className="banner_title1"><span>Public API Access Service for</span><br/>Polkadot Ecosystem</h3>
          }
          <h5 className="banner_title2"> {t("bannerTitle2")} </h5>
        </div>
        <div className={ loaded ? 'banner-img banner-img2 banner-img2-animation' : 'banner-img banner-img2' } ></div>

        <div className="banner-center-holder">
          <span className="countup-title">
            {t('Cumulative')}
          </span>
          <span className="countup">
            <CountUp end={total} suffix="" {...countUpProps}></CountUp>
          </span>
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
                  { !!i18n.language ? i18n.language : 'undefined'}
                  <p className="product-text">1000000</p>
                  <p className="product-tip">{
                    i18n.language === Language.en ?
                      'Requests for every account every day'
                      : '次请求'
                    }</p>
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
