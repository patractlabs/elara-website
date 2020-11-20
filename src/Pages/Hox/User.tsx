import { useState } from "react";
import { createModel } from "hox";

let cookie = document.cookie;
let cookieOff = false;
if (cookie.includes("sid")) {
  cookieOff = true;
}

function useCounter() {
  const [login, setLogin] = useState(cookieOff);
  const [leave, setLeave] = useState(true);
  const [Infos, setInfos] = useState({
    username: 0,
    vip: 0,
    ext: {
      projects: 0,
    },
  });
  const userOff = (code: boolean) => setLogin(code);
  const UserInfos = (info: any) => setInfos(info);
  const UserLoginleave = (info: boolean) => setLeave(info);

  // console.log(cookits.includes("sid"), "document.cookie");

  return {
    login,
    Infos,
    leave,
    userOff,
    UserInfos,
    UserLoginleave
  };
}

export default createModel(useCounter);
