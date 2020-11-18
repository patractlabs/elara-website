import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation} from 'react-i18next'
import { Menu, Dropdown, Avatar, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { login, logout } from "../../Api/Interface";
import userCounterModel from "../Hox/User";
import homeHeight from "../Hox/Home";

import { delCookie } from "../../utils/index";

import "./index.css";

const imglist = [
  {
    img: require("../assets/logo.svg"),
    name: "logo",
  },
  {
    img: require("../assets/signOut.svg"),
  },
];

const Header: React.FC = () => {
  const userInfo = userCounterModel();
  const HomeHFun = homeHeight();
  const { t ,i18n} = useTranslation()

  useEffect(() => {
    login()
      .then((res) => {
        if (res?.code !== 0) {
          userInfo.userOff(false);
          return;
        }
        userInfo.userOff(true);
        userInfo.UserInfos(res?.data);

        let data = res?.data;
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => { };
  }, []);

  const logoutFun = () => {
    logout()
      .then((res) => {
        if (res?.code !== 0) {
          return;
        } else {
          userInfo.userOff(false);

          //清除cookie
          delCookie();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => { };
  };

  const setHomeHight = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (Number(e.target.dataset.id) === 1) {
      HomeHFun.HomeH(0);
    } else if (Number(e.target.dataset.id) === 2) {
      HomeHFun.HomeH(1680);
    } else {
      HomeHFun.HomeH(2100);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item className="menuTitle">
        <p>{t("user.Level")}</p>
        <h3>{t("user.Personal")}</h3>
      </Menu.Item>
      <Menu.Item>
        <p>{t("user.Projects")}</p>
        <h3>
          {userInfo.Infos.ext.projects}/{userInfo.Infos.vip == 0 ? "20" : "100"}
        </h3>
      </Menu.Item>
      <Menu.Item>
        <div className="signOut" onClick={logoutFun}>
          <img src={imglist[1].img} alt="" />
          <span>{t("user.Logout")}</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="Head_main animated fadeInDown">
      <div className="Head_auto">
        <Link to="/">
          <img onClick={()=>{
            HomeHFun.HomeH(0)
          }} data-id="1" src={imglist[0].img} alt="" />
        </Link>

        <button onClick={()=>i18n.changeLanguage(i18n.language==='en'?'zh':'en')}>{i18n.language=='en'?'zh':'en'}</button>

        <ul className="Head_autoUl">
          <li
            onClick={(e) => {
              setHomeHight(e);
            }}
          >
            <Link data-id="1" to="/">
              {t('home')}
            </Link>
          </li>
          <li
            onClick={(e) => {
              setHomeHight(e);
            }}
          >
            <Link data-id="2" to="/">
            {t('serve')}
            </Link>
          </li>
          <li
            onClick={(e) => {
              setHomeHight(e);
            }}
          >
            <Link data-id="3" to="/">
            {t('contactUs')}
            </Link>
          </li>
          <li
            onClick={(e) => {
              message.warning("敬请期待～");
            }}
          >
            {t('Documentation')}
          
          </li>

          {userInfo.login ? (
            <li className="Head_autoUl_User">
              <Dropdown overlay={menu}>
                <div
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar
                    style={{ backgroundColor: "#39CA9F", marginRight: "10px" }}
                    icon={<UserOutlined />}
                  />

                  <NavLink
                    className="header-link"
                    to="/dashboard/console"
                    exact
                  >
                    <span style={{ marginRight: "10px" }}>
                      {userInfo.Infos.uid}
                    </span>
                  </NavLink>

                  <DownOutlined
                    style={{
                      display: "inline-block",
                      color: " #39CA9F",
                      // fontSize: "15px",
                      // margin: "16px 0 10px 0",
                    }}
                  />
                </div>
              </Dropdown>
            </li>
          ) : (
              <li className="Head_autoUl_BUtton">
                <NavLink className="header-link" to="/login" exact>
                  登陆
              </NavLink>
              </li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
