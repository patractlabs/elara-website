import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Avatar, Modal } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { apiLogin, apiLogout } from "../../core/data/api";
// import userCounterModel from "../Hox/User";
// import homeHeight from "../Hox/Home";

import { delCookie } from "../../shared/utils/index";
import logo from '../../assets/logo.svg';
import signOut from '../../assets/signOut.svg';

import "./index.css";
import { APIError, APIErrorType } from '../../core/types/classes/error';
import { LoginModal } from './LoginModal';

const imglist = [
  {
    img: logo,
    name: "logo",
  },
  {
    img: signOut,
  },
];

const Header: React.FC = () => {
  // const userInfo = userCounterModel();
  // const HomeHFun = homeHeight();
  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   apiLogin()
  //     .then(user => {
  //       userInfo.userOff(true);
  //       userInfo.UserInfos(user);

  //       localStorage.setItem("user", JSON.stringify(user));
  //     })
  //     .catch((err: APIError) => {
  //       if (err.type === APIErrorType.business) {
  //         userInfo.userOff(false);
  //       }
  //     });
  //   return () => {};
  // }, []);

  // const logoutFun = () => {
  //   apiLogout()
  //     .then(() => {
  //       //清除cookie
  //       window.location.reload()
  //       delCookie();
  //       userInfo.userOff(false);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  //   return () => {};
  // };

  // const setHomeHight = (e: any) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (Number(e.target.dataset.id) === 1) {
  //     HomeHFun.HomeH(0);
  //   } else if (Number(e.target.dataset.id) === 2) {
  //     HomeHFun.HomeH(1680);
  //   } else {
  //     HomeHFun.HomeH(2100);
  //   }
  // };

  const UserMenu = (
    <Menu>
      <Menu.Item className="menuTitle" >
        <Link to="/dashboard/console">
          <p>{t("user.Level")}</p>
          {/* <h3>{!userInfo.Infos.vip ? t("user.Personal") : t("user.team")}</h3> */}
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/dashboard/console">
          <p>{t("user.Projects")}</p>
          <h3>
            {/* {userInfo.Infos.ext.projects}/{!userInfo.Infos.vip ? "20" : "100"} */}
          </h3>
        </Link>
      </Menu.Item>
      <Menu.Item>
        {/* <div className="signOut" onClick={logoutFun}>
          <img src={imglist[1].img} alt="" />
          <span>{t("user.Logout")}</span>
        </div> */}
      </Menu.Item>
    </Menu>
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
    <div className="Head_main animated fadeInDown">
      <div className="Head_auto">
        <Link to="/" style={{ float: 'left' }}>
          <img
            onClick={() => {
              // HomeHFun.HomeH(0);
            }}
            data-id="1"
            src={imglist[0].img}
            alt=""
          />
        </Link>
        <ul className="Head_tabs_Ul">
          <li
            onClick={(e) => {
              // setHomeHight(e);
            }}
          >
            <Link data-id="1" to="/">
              {t("home")}
            </Link>
          </li>
          <li
            onClick={(e) => {
              // setHomeHight(e);
            }}
          >
            <Link data-id="2" to="/">
              {t("serve")}
            </Link>
          </li>
          <li
            onClick={(e) => {
              // setHomeHight(e);
            }}
          >
            <Link data-id="3" to="/">
              {t("contactUs")}
            </Link>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://docs.elara.patract.io/">
              {t("Documentation")}
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://patract.io/">
              {t("patract hub")}
            </a>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Header;