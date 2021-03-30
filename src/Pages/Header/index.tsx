import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { apiLogin, apiLogout } from "../../core/data/api";
import { delCookie } from "../../shared/utils/index";
import logo from '../../assets/logo.svg';
import signOut from '../../assets/quit.svg';
import { LoginModal } from './LoginModal';
import { useApi } from '../../core/hooks/useApi';

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
  const { homeHeight, user, setUser, isLogged, setIsLoggged } = useApi();
  const [ isLoginModalVisible, setLoginModalVisible ] = useState(false);

  const logout = () => {
    apiLogout()
      .then(() => {
        homeHeight.setHeight(0);
        delCookie();
        setIsLoggged(false);
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
          <img src={signOut} alt="" />
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

  useEffect(() => {
    apiLogin()
      .then(_user => {
        setUser(_user);
        setIsLoggged(true);
        localStorage.setItem("user", JSON.stringify(_user));
      })
      .catch(() => {
        setIsLoggged(false);
      });
  }, [setIsLoggged, setUser]);

  return (
    <div className="head-main animated fadeInDown">
      <div className="head-auto">
        <Link to="/" style={{ display: 'flex', height: '100%', alignItems: 'center', marginRight: '5px' }}>
          <img
            onClick={() => scrollTo(ScrollTarget.Home)}
            src={logo}
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
