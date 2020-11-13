import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { login } from "../../Api/Interface";
import userCounterModel from "../Hox/User";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

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
        <div className="signOut">
          <img src={imglist[1].img} alt="" />
          <span>退出账户</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="Head_main animated fadeInDown">
      <div className="Head_auto">
        <Link to="/">
          <img src={imglist[0].img} alt="" />
        </Link>

        <ul className="Head_autoUl">
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/">服务</Link>
          </li>
          <li>
            <Link to="/">联系我们</Link>
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
