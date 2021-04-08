import { message, Input, Button, Popover } from 'antd';
import React, { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { apiSubscribe } from '../../core/data/api';
import { DiscordSvg } from '../../shared/components/svg/Discord';
import { ElementSvg } from '../../shared/components/svg/Element';
import { GithubSvg } from '../../shared/components/svg/Github';
import { MediumSvg } from '../../shared/components/svg/Medium';
import { TelegramSvg } from '../../shared/components/svg/Telegram';
import { TwitterSvg } from '../../shared/components/svg/Twitter';
import { WechatSvg } from '../../shared/components/svg/Wechat';
import { YoutubeSvg } from '../../shared/components/svg/Youtube';
import FooterLogo from '../../assets/footer-logo.svg';
import WechatQRCode from '../../assets/wechat-qrcode.jpg';

import "./index.css";

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

const Footer: React.FC = () => {
  const [ subLoading, setSubLoading ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>('');
  const [ iconLinkHoverAt, setIconLinkHoverAt ] = useState<IconLink>(IconLink.Null);
  const { t } = useTranslation();

  const onSubscribe = () => {
    setSubLoading(true);
    apiSubscribe({ email }).then(
      () => message.success(t('tip.Subscribe Successfully')),
      () => message.error(t('tip.Subscribe Failed')),
    ).finally(() => setSubLoading(false));
  };

  const disabled = useMemo(() => {
    // const reg = new RegExp('[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*');
    return !email;
  }, [email]);

  return (
    <footer className="home-footer" id="home-footer">
      <div className="footer-content">
        <div className="footer-sites-holder">
          <div className="site-class">
            <h3>{ t('footer.Websites') }</h3>
            <ul className="site-list">
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://patract.io">Patract</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://patract.io/products">Products</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://blog.patract.io/">Blog</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://docs.patract.io/">Docs</a>
              </li>
            </ul>
          </div>
          
          <div className="site-class">
            <h3>{ t('footer.Contracts') }</h3>
            <ul className="site-list">
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/jupiter">Jupiter</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/ask">Ask!</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/metis">Metis</a>
              </li>
            </ul>
          </div>

          <div className="site-class">
            <h3>{ t('footer.Tools') }</h3>
            <ul className="site-list">
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://redspot.patract.io">Redspot</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/europa">Europa</a>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/zkmega">zkMega</a>
              </li>
              <li className="site">
                <span>Himalia</span>
              </li>
            </ul>
          </div>
          
          <div className="site-class">
            <h3>{ t('footer.Services') }</h3>
            <ul className="site-list">
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://elara.patract.io">Elara</a>
              </li>
              <li className="site">
                <span>Leda</span>
              </li>
              <li className="site">
                <span>Carpo</span>
              </li>
              <li className="site">
                <a target="_blank" rel="noreferrer" href="https://patrastore.io">PatraStore</a>
              </li>
              <li className="site">
                <span>PatraScan</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="contact">
          <h2>{ t('Contact & Subscription') }</h2>
          <div style={{ display: 'flex' }}>
            <Input onChange={ e => setEmail(e.target.value) } style={{ flex: 1, height: '48px', width: '300px', marginRight: '10px' }} />
            <Button disabled={disabled} loading={subLoading} onClick={ onSubscribe } style={{ fontSize: '16px', color: 'white', backgroundColor: '#14B071', height: '48px', padding: '0px 21px' }}>{ t('Subscribe') }</Button>
          </div>
          <ul className="contact-list">
            <li>
              <Popover content={<img style={{ width: '150px', height: '150px' }} src={WechatQRCode} alt="" />} title={null}>
              <a href="mailto:hi@patractlabs.com" onMouseOver={ () => setIconLinkHoverAt(IconLink.Wechat) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                <WechatSvg  color={ iconLinkHoverAt === IconLink.Wechat ? green : defaultGray } />
              </a>
              </Popover>
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
              <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs" onMouseOver={ () => setIconLinkHoverAt(IconLink.Github) } onMouseOut={ () => setIconLinkHoverAt(IconLink.Null) }>
                <GithubSvg  color={ iconLinkHoverAt === IconLink.Github ? green : defaultGray } />
              </a>
            </li>
          </ul>
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
            <a href="mailto:elara@patract.io">elara@patract.io</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
