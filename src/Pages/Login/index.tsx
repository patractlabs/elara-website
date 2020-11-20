import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createHashHistory } from "history"; // 如果是history路由
import { Prompt } from "react-router-dom";

import { login } from "../../Api/Interface";
import userCounterModel from "../Hox/User";

import { URL_ACCOUNT } from "../../Config/origin";
import PageH from "../../utils/pageHeight";

import Footer from "../Footer/index";

import "./index.css";

const imgList = [require("../assets/Github.svg")];
let off = true;

interface prposChild {
  openWindow: Function;
}

const Login: React.FC<prposChild> = ({ openWindow }) => {
  const history = createHashHistory();
  const userInfo = userCounterModel();
  const { t } = useTranslation();

  useEffect(() => {
    loginInit();
  }, []);

  // const  confirmToSave = (locaion) {
  //   console.log('准备离开了吗')
  //    return false
  //  }

  openWindow = () => {
    window.open(URL_ACCOUNT + "/auth/github");

    window.addEventListener(
      "message",
      (ev) => {
        // if (ev.source !== window.parent) {return;}
        const data = ev.data;
        console.log(ev.data, "进来了吗");
        localStorage.setItem("token", "123456");
        loginInit();

        window.removeEventListener(
          "onmessage",
          () => {
            console.log("取消监听");
          },
          false
        );
      },
      false
    );

    // window.onmessage = function (ev: { data: any }) {
    //   if (off) {
    //     const data = ev.data;
    //     console.log(ev.data);
    //     localStorage.setItem("token", "123456");
    //     loginInit();
    //     off = false;
    //     // setTimeout(() => {
    //     //   off = true;
    //     // }, 60000);

    //     window.removeEventListener(
    //       "onmessage",
    //       () => {
    //         console.log("取消监听");
    //       },
    //       false
    //     );
    //   }
    // };
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
        message={() => {
          off = true;
          return true;
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
