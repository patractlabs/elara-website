import React, { useEffect, useState } from "react";
import { login } from "../../Api/Interface";
import userCounterModel from "../Hox/User";
import { createHashHistory } from "history"; // 如果是history路由

import PageH from "../../utils/pageHeight";

import Footer from "../Footer/index";

import "./index.css";

const PROCESS =
  process.env.NODE_ENV === "development" ? "http://8.210.110.126:7001" : "";

const imgList = [require("../assets/Github.svg")];

interface prposChild {
  openWindow: Function;
}

const Login: React.FC<prposChild> = ({ openWindow }) => {
  const history = createHashHistory();
  const userInfo = userCounterModel();
  useEffect(() => {
    loginInit();
  }, []);

  openWindow = () => {
    console.log(process.env);
    window.open(PROCESS + "/auth/github");

    //接受登陆传回来的值
    window.addEventListener(
      "message",
      (ev) => {
        // if (ev.source !== window.parent) {return;}
        const data = ev.data;
        console.log(ev.data, "进来了吗");
        localStorage.setItem("token", "123456");
        loginInit();
      },
      false
    );
  };

  function loginInit() {
    login()
      .then((res) => {
        if (res?.code !== 0) {
          userInfo.userOff(false);
          console.log("失败");
          return;
        }
        userInfo.userOff(true);
        userInfo.UserInfos(res?.data);

        let data = res?.data;
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/dashboard/console");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="login">
      <div className="loginMain" style={{ height: PageH(128) }}>
        <h2>第三方登录</h2>
        <div
          className="loginBtn"
          onClick={() => {
            openWindow();
          }}
        >
          <img src={imgList[0]} alt="" />
          <span>GitHub</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
