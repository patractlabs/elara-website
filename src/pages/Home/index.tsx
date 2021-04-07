import React, { useEffect, useState } from "react";
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
import FooterLogo from '../../assets/footer-logo.svg';
import WechatSvg from '../../assets/wechat.svg';
import TwitterSvg from '../../assets/twitter.svg';
import MediumSvg from '../../assets/medium.svg';
import TelegramSvg from '../../assets/telegram.svg';
import DiscordSvg from '../../assets/discord.svg';
import YoutubeSvg from '../../assets/youtube.svg';
import ElementSvg from '../../assets/ele.svg';
import GithubSvg from '../../assets/github.svg';
import "./index.css";
import { Language } from '../../core/enum';
import { useApi } from '../../core/hooks/useApi';
import { LoginModal } from '../../shared/components/LoginModal';
import { useHistory } from 'react-router';
import { Button, Carousel, Input } from 'antd';

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
const Home: React.FC = () => {
  const [ isLoginModalVisible, setLoginModalVisible ] = useState(false);
  const [ total, setTotal ] = useState(0);
  const history = useHistory();
  const { isLogged, homeHeight } = useApi();
  const { t, i18n } = useTranslation();

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
    apiGetChainStats()
      .then(chainStatus =>
        setTotal(
          Object.keys(chainStatus)
            .reduce((sum, current) => sum + Number(chainStatus[current]), 0)
        )
      );
  }, []);

  return (
    <div className="Home" id="Home">
      <div className="Home_banner animated fadeInLeft">
        <div className="banner-img banner-img1"></div>
        <div className="banner-title-holder">
          {
            i18n.language === Language.zh ?
              <h3 className="banner_title1">波卡生态的公共API接入服务</h3>
              :
              <h3 className="banner_title1"><span>Public API Access Service for</span><br/>Polkadot Ecosystem</h3>
          }
          <h5 className="banner_title2"> {t("bannerTitle2")} </h5>
        </div>
        <div className="banner-img banner-img2"></div>

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


      <div className="product">
        <h2>
          {t('We provide you')}
        </h2>
        <div className="product-main">
          <div className="product-left"></div>
          <div style={{ position: 'absolute', left: '240px', right: '240px', height: '327px' }}>
            <Carousel autoplay>
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

      <footer className="home-footer" id="home-footer">
        <div className="footer-content">
          <h2 className="footer-sites-title">
            { t('Public API Access Service for Polkadot Ecosystem') }
          </h2>
          <div className="footer-content-main">
            <div className="footer-sites-holder">
               <ul className="site-list">
                <li className="site">
                  <a href="">Jupiter</a>
                </li>
                <li className="site">
                  <a href="">Ask!</a>
                </li>
                <li className="site">
                  <a href="">Metis</a>
                </li>
                <li className="site">
                  <a href="">Redspot</a>
                </li>
                <li className="site">
                  <a href="">Europa</a>
                </li>
                <li className="site">
                  <a href="">zkMega</a>
                </li>
              </ul>
              <ul className="site-list">
                <li className="site">
                  <a href="">Himalia</a>
                </li>
                <li className="site">
                  <a href="">Elara</a>
                </li>
                <li className="site">
                  <a href="">Leda</a>
                </li>
                <li className="site">
                  <a href="">Carpo</a>
                </li>
                <li className="site">
                  <a href="">PatraStore</a>
                </li>
                <li className="site">
                  <a href="">PatraScan</a>
                </li>
              </ul>
            </div>
            <div className="contact">
              <h2>{ t('Contact & Subscription') }</h2>
              <div>
                <Input style={{ height: '48px', width: '300px', marginRight: '10px' }} />
                <Button style={{ fontSize: '16px', color: 'white', backgroundColor: '#14B071', height: '48px', width: '120px' }}>{ t('Subscribe') }</Button>
              </div>
              <ul className="contact-list">
                <li>
                  <a href="mailto:hi@patractlabs.com">
                    <img src={WechatSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://twitter.com/patractlabs">
                    <img src={TwitterSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://medium.com/@patractlabs">
                    <img src={MediumSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://t.me/patract">
                    <img src={TelegramSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://discord.gg/wJ8TnTfjcq">
                    <img src={DiscordSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCnvwkuLKx6k56M5rErH9AoQ">
                    <img src={YoutubeSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://app.element.io/#/room/#PatractLabsDev:matrix.org">
                    <img src={ElementSvg} alt="" />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/elara">
                    <img src={GithubSvg} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bg"></div>
        </div>
        <div className="footer-info">
          <div>
            <img src={FooterLogo} alt="" />
          </div>
          <div className="info-row">
            <p className="copyright">© 2021 Patract Labs Co., Limited, All Rights Reserved.</p>
            <p className="email">
              <a href="mailto:hi@patract.io">hi@patract.io</a>
            </p>
          </div>
        </div>
      </footer>
      <LoginModal isModalVisible={isLoginModalVisible} onModalClose={() => setLoginModalVisible(false)} />
    </div>
  );
};

export default Home;
