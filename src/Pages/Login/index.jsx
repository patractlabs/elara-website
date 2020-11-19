import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { createHashHistory } from "history"; // 如果是history路由
import { Prompt } from 'react-router-dom'

import { login } from "../../Api/Interface";
import userCounterModel from "../Hox/User";

import { URL_ACCOUNT } from '../../Config/origin'
import PageH from "../../utils/pageHeight";

import Footer from "../Footer/index";

import "./index.css";

const imgList = [require("../assets/Github.svg")];
let off = true

// interface prposChild {
//   openWindow: Function;
//   Prompt:any
// }



// const Login: React.FC<prposChild> = ({ openWindow, Prompt}) => {
const Login = () => {
  const history = createHashHistory();
  const userInfo = userCounterModel();
  const { t } = useTranslation();
  useEffect(() => {
    loginInit();
  }, []);

  const confirmToSave = (location) => {
    console.log('准备离开了吗')
    off = true
    return false
  }

  const openWindow = () => {
    window.open(URL_ACCOUNT + "/auth/github");

    window.onmessage = function (ev) {
      if (off) {
        const data = ev.data;
        console.log(ev.data, "进来了吗");
        localStorage.setItem("token", "123456");
        loginInit();
        off = false
      }

    }

    //接受登陆传回来的值
    // window.addEventListener(
    //   "message",
    //   (ev) => {
    //     // if (ev.source !== window.parent) {return;}
    //     const data = ev.data;
    //     console.log(ev.data, "进来了吗");
    //     localStorage.setItem("token", "123456");
    //     loginInit();
    //   },
    //   false
    // );
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
    <div className="login animated fadeInLeft">
      <Prompt
        when={true}
        message={(location) => {
          confirmToSave(location)
        }}
      />
      <div className="loginMain" style={{ height: PageH(128) }}>
        <h2>{t("sign.Sign")}</h2>
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
