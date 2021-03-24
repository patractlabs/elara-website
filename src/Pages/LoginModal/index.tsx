import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { apiLogin } from '../../core/data/api';
import { APIError, APIErrorType } from '../../core/types/classes/error';
import { createHashHistory } from "history";
import userCounterModel from "../Hox/User";
import { URL_ACCOUNT } from '../../config/origin';
import { Modal } from 'antd';
import ElaraLogin from '../../assets/elara-login.webp';
import GithubLogo from '../../assets/github-logo.svg';
import CloseIcon from '../../assets/close.svg';

let off = true;

export const LoginModal: React.FC<{ isLoginModalVisible: boolean; onLoginModalClose(): void }> = ({ isLoginModalVisible, onLoginModalClose }) => {
  const history = createHashHistory();
  const userInfo = userCounterModel();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoginModalVisible) {
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
  }, [isLoginModalVisible]);

  const openWindow = () => {
    window.open(`${URL_ACCOUNT}/auth/github`);
    console.log('open window', `${URL_ACCOUNT}/auth/github`);
    window.onmessage = function (ev: { data: any }) {
      console.log('ev', ev);
      
      if (off) {
        console.log('message', ev.data);
        localStorage.setItem("token", "123456");
        loginInit();
        off = false;
      }
    };
  };

  async function loginInit() {
    console.log('loginit');
    
    return apiLogin()
      .then(user => {
        console.log('apilogin', user);

        userInfo.userOff(true);
        userInfo.UserInfos(user);
        
        localStorage.setItem("user", JSON.stringify(user));

        history.push("/dashboard/console");

        return true;
      })
      .catch((err: APIError) => {
        console.log('apilogin err', err);
        if (err.type === APIErrorType.business) {
          userInfo.userOff(false);
          return false;
        }
      });
  }

  return (
    <Modal wrapClassName="login-modal-wrap" width="400px" visible={isLoginModalVisible} closable={false} onCancel={ onLoginModalClose } footer={null} title={null}>
      <div className="login-modal">
        <div className="login-modal-title">
          <img className="login-modal-title-img" src={ElaraLogin} alt="" />
          <img className="login-modal-close" src={CloseIcon} alt="" onClick={ onLoginModalClose } />
        </div>
        <div className="login-modal-body">
          <div className="login-text">{ t('sign.Sign') }</div>
          <div className="login-github">
            <img src={GithubLogo} alt="" />
          </div>
          <div className="login-modal-btn" onClick={ () => openWindow() }>{ t('sign.signin') }</div>
        </div>
      </div>
    </Modal>
  );
};
