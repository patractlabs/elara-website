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

const imglist = [
  {
    img: logo,
  },
  {
    img: signOut,
  },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, setUser, isLogged, setIsLoggged } = useApi();

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

  const logoutFun = () => {
    apiLogout()
      .then(() => {
        //清除cookie
        window.location.reload()
        delCookie();
        setIsLoggged(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => {};
  };

  const setHomeHight = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (Number(e.target.dataset.id) === 1) {
      // HomeHFun.HomeH(0);
    } else if (Number(e.target.dataset.id) === 2) {
      // HomeHFun.HomeH(1680);
    } else {
      // HomeHFun.HomeH(2100);
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
        <div className="sign-out" onClick={logoutFun}>
          <img src={imglist[1].img} alt="" />
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
            onClick={() => {
              // HomeHFun.HomeH(0);
            }}
            data-id="1"
            src={imglist[0].img}
            className="logo"
            alt=""
          />
        </Link>
        <div className="head-content">
          <ul className="head-tabs">
            <li>
              <a href="#">
                {t("home")}
              </a>
              <div className="tab-title-bottom"></div>
            </li>
            <li>
              <a href="#">
                {t("serve")}
              </a>
              <div className="tab-title-bottom"></div>
            </li>
            <li>
              <a href="#">
                {t("contactUs")}
              </a>
              <div className="tab-title-bottom"></div>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://docs.elara.patract.io/">
                {t("Documentation")}
              </a>
              <div className="tab-title-bottom"></div>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://patract.io/">
                {t("patract hub")}
              </a>
              <div className="tab-title-bottom"></div>
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
