import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { apiGetChainStats, apiSubscribe } from "../../core/data/api";
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
import { WechatSvg } from '../../shared/components/svg/Wechat';
import { TwitterSvg } from '../../shared/components/svg/Twitter';
import { MediumSvg } from '../../shared/components/svg/Medium';
import { TelegramSvg } from '../../shared/components/svg/Telegram';
import { DiscordSvg } from '../../shared/components/svg/Discord';
import { YoutubeSvg } from '../../shared/components/svg/Youtube';
import { ElementSvg } from '../../shared/components/svg/Element';
import { GithubSvg } from '../../shared/components/svg/Github';
import "./index.css";
import { Language } from '../../core/enum';
import { useApi } from '../../core/hooks/useApi';
import { LoginModal } from '../../shared/components/LoginModal';
import { useHistory } from 'react-router';
import { message, Button, Carousel, Input } from 'antd';

const green = '#14B071';
const defaultGray = '#2A292B';

enum IconLink {
  Wechat = 'Wechat',
  Twitter = 'Twitter',
  Medium = 'Medium',
  Telegram = 'Telegram',
  Discord = 'Discord',
  Youtube = 'Youtube',
  Element = 'Element',
  Github = 'Github',
  Null = 'Null',
}

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
  const [ subLoading, setSubLoading ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>('');
  const [ iconLinkHoverAt, setIconLinkHoverAt ] = useState<IconLink>(IconLink.Null);
  const history = useHistory();
  const { isLogged, homeHeight } = useApi();
  const { t, i18n } = useTranslation();

  const gotoDashboard = () => {
    if (!isLogged) {
      return setLoginModalVisible(true);
    }
    history.push("/dashboard/projects");
  };

  const onSubscribe = () => {
    setSubLoading(true);
    apiSubscribe({ email }).then(
      () => message.success(t('tip.Subscribe Successfully')),
      () => message.error(t('tip.Subscribe Failed')),
    ).finally(() => setSubLoading(false));
  };

  const disabled = useMemo(() => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !email || !reg.test(email);
  }, [email]);

  useEffect(() => {
    window.scrollTo({ top: homeHeight.height });
  }, [homeHeight.height]);

  useEffect(() => {
    window.addEventListener('load', () => { console.log('load'); setLoaded(true) }, false);
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
                <Input onChange={ e => setEmail(e.target.value) } style={{ height: '48px', width: '300px', marginRight: '10px' }} />
                <Button disabled={disabled} loading={subLoading} onClick={ onSubscribe } style={{ fontSize: '16px', color: 'white', backgroundColor: '#14B071', height: '48px', padding: '0px 21px' }}>{ t('Subscribe') }</Button>
              </div>
              <ul className="contact-list">
                <li>
                  <a href="mailto:hi@patractlabs.com" onMouseOver={ () => setIconLinkHoverAt(IconLink.Wechat) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <WechatSvg  color={ iconLinkHoverAt === IconLink.Wechat ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://twitter.com/patractlabs" onMouseOver={ () => setIconLinkHoverAt(IconLink.Twitter) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <TwitterSvg  color={ iconLinkHoverAt === IconLink.Twitter ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://medium.com/@patractlabs" onMouseOver={ () => setIconLinkHoverAt(IconLink.Medium) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <MediumSvg  color={ iconLinkHoverAt === IconLink.Medium ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://t.me/patract" onMouseOver={ () => setIconLinkHoverAt(IconLink.Telegram) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <TelegramSvg  color={ iconLinkHoverAt === IconLink.Telegram ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://discord.gg/wJ8TnTfjcq" onMouseOver={ () => setIconLinkHoverAt(IconLink.Discord) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <DiscordSvg  color={ iconLinkHoverAt === IconLink.Discord ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCnvwkuLKx6k56M5rErH9AoQ" onMouseOver={ () => setIconLinkHoverAt(IconLink.Youtube) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <YoutubeSvg  color={ iconLinkHoverAt === IconLink.Youtube ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://app.element.io/#/room/#PatractLabsDev:matrix.org" onMouseOver={ () => setIconLinkHoverAt(IconLink.Element) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <ElementSvg  color={ iconLinkHoverAt === IconLink.Element ? green : defaultGray } />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/elara" onMouseOver={ () => setIconLinkHoverAt(IconLink.Github) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                    <GithubSvg  color={ iconLinkHoverAt === IconLink.Github ? green : defaultGray } />
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
