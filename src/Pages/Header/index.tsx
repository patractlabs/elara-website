import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { login, logout } from "../../Api/Interface";
import userCounterModel from "../Hox/User";
import homeHeight from "../Hox/Home";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

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
    return () => {};
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
    return () => {};
  };

  const setHomeHight = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (Number(e.target.dataset.id) === 1) {
      HomeHFun.HomeH(0);
    } else if (Number(e.target.dataset.id) === 2) {
      HomeHFun.HomeH(700);
    } else {
      HomeHFun.HomeH(1650);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item className="menuTitle">
        <p>账号级别</p>
        <h3>个人开发</h3>
      </Menu.Item>
      <Menu.Item>
        <p>项目总数</p>
        <h3>
          {userInfo.Infos.ext.projects}/{userInfo.Infos.vip == 0 ? "20" : "100"}
        </h3>
      </Menu.Item>
      <Menu.Item>
        <div className="signOut" onClick={logoutFun}>
          <img src={imglist[1].img} alt="" />
          <span>退出账户</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="Head_main animated fadeInDown">
      <div className="Head_auto">
        <Link
          to="/"
          onClick={(e) => {
            setHomeHight(e);
          }}
        >
          <img data-id="1" src={imglist[0].img} alt="" />
        </Link>

        <ul className="Head_autoUl">
          <li
            onClick={(e) => {
              setHomeHight(e);
            }}
          >
            <Link data-id="1" to="/">
              首页
            </Link>
          </li>
          <li
            onClick={(e) => {
              setHomeHight(e);
            }}
          >
            <Link data-id="2" to="/">
              服务
            </Link>
          </li>
          <li
            onClick={(e) => {
              setHomeHight(e);
            }}
          >
            <Link data-id="3" to="/">
              联系我们
            </Link>
          </li>
          <li>API文档</li>

          {userInfo.login ? (
            <li className="Head_autoUl_User">
              <Dropdown overlay={menu}>
                <a
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
                </a>
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
