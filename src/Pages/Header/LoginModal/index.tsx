import React, { useCallback, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { apiLogin } from '../../../core/data/api';
import { APIError, APIErrorType } from '../../../core/types/classes/error';
import { createHashHistory } from "history";
import userCounterModel from "../../Hox/User";
import { URL_ACCOUNT } from '../../../config/origin';
import ElaraLogin from '../../../assets/elara-login.webp';
import GithubLogo from '../../../assets/github-logo.svg';
import CloseIcon from '../../../assets/close.svg';
import './index.css';
import { createPlainModal } from '../../../shared/components/plain-modal';

let off = true;

const _LoginModal: React.FC<{ isModalVisible: boolean; onModalClose(): void }> = ({ isModalVisible, onModalClose }) => {
  const history = createHashHistory();
  const userInfo = userCounterModel();
  const { t } = useTranslation();

  const loginInit = useCallback(() => {
    console.log('loginit');
     
    return apiLogin()
      .then(user => {
        console.log('apilogin', user);

        userInfo.userOff(true);
        userInfo.UserInfos(user);
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/dashboard/projects");
        return true;
      })
      .catch((err: APIError) => {
        console.log('apilogin err', err);
        if (err.type === APIErrorType.business) {
          userInfo.userOff(false);
          return false;
        }
      });
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      return;
    }
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
  }, [isModalVisible, loginInit]);

  const openWindow = () => {
    window.open(`${URL_ACCOUNT}/auth/github`);
    console.log('open window', `${URL_ACCOUNT}/auth/github`);
    window.onmessage = function (ev: { data: any }) {
      console.log('ev', ev);
      
      if (off) {
        console.log('message', ev.data);
        loginInit();
        off = false;
      }
    };
  };

  return (
    <div className="login-modal">
      <div className="login-modal-title">
        <img className="login-modal-title-img" src={ElaraLogin} alt="" />
        <img className="login-modal-close" src={CloseIcon} alt="" onClick={ onModalClose } />
      </div>
      <div className="login-modal-body">
        <div className="login-text">{ t('sign.Sign') }</div>
        <div className="login-github">
          <img src={GithubLogo} alt="" />
        </div>
        <div className="login-modal-btn" onClick={ () => openWindow() }>{ t('sign.signin') }</div>
      </div>
    </div>
  );
};

export const LoginModal = createPlainModal(_LoginModal, 400);