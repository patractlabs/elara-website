import React, { useCallback, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { apiLogin } from '../../../core/data/api';
import { APIError } from '../../../core/types/classes/error';
import { LOGIN_DOMAIN } from '../../../config/origin';
import ElaraLogin from '../../../assets/elara-login.webp';
import GithubLogo from '../../../assets/github-logo.svg';
import CloseIcon from '../../../assets/close.svg';
import './index.css';
import { createPlainModal } from '../plain-modal';
import { useApi } from '../../../core/hooks/useApi';
import { useHistory } from 'react-router';

let off = true;

const _LoginModal: React.FC<{ isModalVisible: boolean; onModalClose(): void }> = ({ isModalVisible, onModalClose }) => {
  const history = useHistory();
  const { setUser, setIsLoggged } = useApi();
  const { t } = useTranslation();

  const loginInit = useCallback(() =>
    apiLogin()
      .then(_user => {
        setIsLoggged(true);
        setUser(_user);
        localStorage.setItem("user", JSON.stringify(_user));
        history.push("/dashboard/projects");
        return true;
      })
      .catch((err: APIError) => {
        setIsLoggged(false);
        return false;
      }
  ), [setIsLoggged, setUser, history]);

  const openWindow = () => {
    window.open(`${LOGIN_DOMAIN}/auth/github`);

    console.log('open window', `${LOGIN_DOMAIN}/auth/github`);
    window.onmessage = function (ev: { data: any }) {
      if (off) {
        console.log('message', ev.data);
        loginInit();
        off = false;
      }
    };
  };

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