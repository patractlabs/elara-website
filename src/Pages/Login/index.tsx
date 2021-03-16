import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createHashHistory } from "history"; // 如果是history路由
import { Prompt } from "react-router-dom";

import { apiLogin } from "../../core/data/api";
import userCounterModel from "../Hox/User";

import { URL_ACCOUNT } from "../../config/origin";
import PageH from "../../utils/pageHeight";
import Footer from "../Footer/index";

import "./index.css";
import { APIError, APIErrorType } from '../../core/types/classes/error';

const imgList = [require("../../assets/Github.svg")];
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

    const repeater = setInterval(async () => {
        const result = await loginInit();
        if(result === true) {
          clearInterval(repeater)
        }
    }, 2000);

    return () => {
      clearInterval(repeater)
    }
  }, []);

  // const  confirmToSave = (locaion) {
  //   console.log('准备离开了吗')
  //    return false
  //  }

  openWindow = () => {
    window.open(URL_ACCOUNT + "/auth/github");

    // window.addEventListener(
    //   "message",
    //   (ev) => {
    //     // if (ev.source !== window.parent) {return;}
    //     const data = ev.data;
    //     console.log(ev.data, "进来了吗");
    //     localStorage.setItem("token", "123456");
    //     loginInit();

    //     window.removeEventListener(
    //       "onmessage",
    //       () => {
    //         console.log("取消监听");
    //       },
    //       false
    //     );
    //   },
    //   false
    // );

    window.onmessage = function (ev: { data: any }) {
      if (off) {
        // const data = ev.data;
        console.log(ev.data);
        localStorage.setItem("token", "123456");

        loginInit();

        // userInfo.UserLoginleave(false)
        off = false;
        // window.removeEventListener(
        //   "onmessage",
        //   () => {
        //     console.log("取消监听");
        //   },
        //   false
        // );
      }
    };
  };

  async function loginInit() {
    return apiLogin()
      .then(user => {
        userInfo.userOff(true);
        userInfo.UserInfos(user);
        
        localStorage.setItem("user", JSON.stringify(user));

        history.push("/dashboard/console");

        return true;
      })
      .catch((err: APIError) => {
        if (err.type === APIErrorType.business) {
          userInfo.userOff(false);
          return false;
        }
      });
  }

  return (
    <div className="login animated fadeInLeft">
      <Prompt
        when={true}
        message={() => {
          off = true;
          // userInfo.UserLoginleave(true)
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
