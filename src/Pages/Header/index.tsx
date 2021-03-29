import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { apiLogin, apiLogout } from "../../core/data/api";
import { delCookie } from "../../shared/utils/index";
import logo from '../../assets/logo.svg';
import signOut from '../../assets/quit.svg';
import "./index.css";
import { APIError, APIErrorType } from '../../core/types/classes/error';
import { LoginModal } from './LoginModal';
import { useApi } from '../../core/hooks/useApi';

const imglist = [ logo, signOut ];

enum ScrollTarget {
  Home = 'Home',
  Service = 'Service',
  Contact = 'Contact',
}
enum MouseOn {
  Home = 'Home',
  Service = 'Service',
  Contact = 'Contact',
  APIDoc = 'APIDoc',
  Hub = 'Hub',
  Null = 'Null'
}

const Header: React.FC = () => {
  const [ mouseOn, setMouseOn ] = useState<MouseOn>(MouseOn.Null);
  const { t, i18n } = useTranslation();
  const { user, setUser, isLogged, setIsLoggged } = useApi();
  const { homeHeight } = useApi();

  useEffect(() => {
    apiLogin()
      .then(_user => {
        setIsLoggged(true);
        setUser(_user);

        localStorage.setItem("user", JSON.stringify(_user));
      })
      .catch((err: APIError) => {
        if (err.type === APIErrorType.business) {
          setIsLoggged(false);
        }
      });
    return () => {};
  }, []);

  const logout = () => {
    apiLogout()
      .then(() => {
        window.location.reload()
        delCookie();
        setIsLoggged(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => {};
  };

  const scrollTo = (target: ScrollTarget) => {
    switch (target) {
      case ScrollTarget.Home:
        homeHeight.setHeight(0);
        break;
      case ScrollTarget.Service:
        const serviceDiv = document.getElementById('home-service');
        homeHeight.setHeight(serviceDiv?.offsetTop || 1248);
        break;
      case ScrollTarget.Contact:
        const footerDiv = document.getElementById('home-footer');
        homeHeight.setHeight(footerDiv?.offsetTop || 1836);
        break;
    }
  };

  const UserMenu = (
    <ul className="user-menu">
      <li className="">
        <Link to="/dashboard/projects">
          <p>{t("user.Level")}</p>
          <h3>{!user.vip ? t("user.Personal") : t("user.team")}</h3>
        </Link>
      </li>
      <li className="user-menu-project-counts">
        <Link to="/dashboard/projects">
          <p>{t("user.Projects")}</p>
          <h3>
            {user.ext.projects}/{!user.vip ? "20" : "100"}
          </h3>
        </Link> 
      </li>
      <li className="menu-split"></li>
      <li className="user-menu-logout">
        <div className="sign-out" onClick={logout}>
          <img src={imglist[1]} alt="" />
          <span>{t("user.Logout")}</span>
        </div>
      </li>
    </ul>
  );

  const LanguageMenu = (
    <Menu>
      <Menu.Item>
        <p onClick={() => i18n.changeLanguage("en")} className="changeLanguage">
          English
        </p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => i18n.changeLanguage("zh")} className="changeLanguage">
          中文
        </p>
      </Menu.Item>
    </Menu>
  );
  const [ isLoginModalVisible, setLoginModalVisible ] = useState(false);

  return (
    <div className="head-main animated fadeInDown">
      <div className="head-auto">
        <Link to="/" style={{ display: 'flex', height: '100%', alignItems: 'center', marginRight: '5px' }}>
          <img
            onClick={() => scrollTo(ScrollTarget.Home)}
            src={imglist[0]}
            className="logo"
            alt=""
          />
        </Link>
        <div className="head-content">
          <ul className="head-tabs">
            <li>
              <Link to="/" onClick={() => scrollTo(ScrollTarget.Home)} onMouseOver={() => setMouseOn(MouseOn.Home)} onMouseOut={() => setMouseOn(MouseOn.Null)}>
                {t("home")}
              </Link>
              {
                mouseOn === MouseOn.Home && 
                  <div className="tab-title-bottom"></div>
              }
            </li>
            <li>
              <Link to="/" onClick={() => scrollTo(ScrollTarget.Service)} onMouseOver={() => setMouseOn(MouseOn.Service)} onMouseOut={() => setMouseOn(MouseOn.Null)}>
                {t("serve")}
              </Link>
              {
                mouseOn === MouseOn.Service && 
                  <div className="tab-title-bottom"></div>
              }
            </li>
            <li>
              <Link to="/" onClick={() => scrollTo(ScrollTarget.Contact)} onMouseOver={() => setMouseOn(MouseOn.Contact)} onMouseOut={() => setMouseOn(MouseOn.Null)}>
                {t("contactUs")}
              </Link>
              {
                mouseOn === MouseOn.Contact && 
                  <div className="tab-title-bottom"></div>
              }
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://docs.elara.patract.io/" onMouseOver={() => setMouseOn(MouseOn.APIDoc)} onMouseOut={() => setMouseOn(MouseOn.Null)}>
                {t("Documentation")}
              </a>
              {
                mouseOn === MouseOn.APIDoc && 
                  <div className="tab-title-bottom"></div>
              }
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://patract.io/" onMouseOver={() => setMouseOn(MouseOn.Hub)} onMouseOut={() => setMouseOn(MouseOn.Null)}>
                {t("patract hub")}
              </a>
              {
                mouseOn === MouseOn.Hub && 
                  <div className="tab-title-bottom"></div>
              }
            </li>
          </ul>
          <ul className="head-right">
          {
            isLogged ?
              <li>
                <Dropdown overlay={UserMenu}>
                  <span className="PHover">
                    <span style={{ marginRight: '8px' }}>
                      { user.username }
                    </span>
                    <DownOutlined
                      style={{
                        display: "inline-block",
                        color: " #fff",
                      }}
                    />
                  </span>
                </Dropdown> 
              </li>
                :
              <li className="user_login">
                <div className="login_btn" onClick={ () => setLoginModalVisible(true) }>{t("sign.login")}</div>
                <LoginModal isModalVisible={isLoginModalVisible} onModalClose={() => setLoginModalVisible(false)} />
              </li>
          }
           <li>
            <Dropdown overlay={LanguageMenu}>
              <span className="PHover" style={{ marginLeft: '25px' }}>
                <span style={{ marginRight: '8px' }}>
                  {i18n.language === "en" ? "English " : "中文 "}
                </span>
                <DownOutlined
                  style={{
                    display: "inline-block",
                    color: " #fff",
                  }}
                />
              </span>
            </Dropdown>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
