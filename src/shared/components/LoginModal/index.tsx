import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { apiLogin } from '../../../core/data/api';
import { APIError } from '../../../core/types/classes/error';
import { API_DOMAIN } from '../../../config/origin';
import './index.css';
import { createPlainModal } from '../plain-modal';
import { useApi } from '../../../core/hooks/useApi';
import GithubLogo from '../../../assets/github-login.svg';
import GithubWhite from '../../../assets/github-white.svg';
import { useHistory } from 'react-router';

const _LoginModal: React.FC<{ isModalVisible: boolean; onModalClose(): void }> = ({ isModalVisible }) => {
  const history = useHistory();
  const { setUser, setIsLoggged } = useApi();
  const { t } = useTranslation();
  const [ hover, setIsHoverd ] = useState<boolean>(false);

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

  const openWindow = () => window.open(`${API_DOMAIN}/auth/github`);

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
      <div className="login-modal-body">
        <div className="login-text">{ t('sign.Connect to Polkadot now') }</div>
        <div className="login-github">
          <button
            className="login-modal-btn"
            onMouseOver={ () => setIsHoverd(true) }
            onMouseOut={ () => setIsHoverd(false) }
            onClick={ openWindow }
          >
            <img src={ hover ? GithubWhite : GithubLogo } alt="" style={{ marginRight: '16px' }} />
            { t('sign.Github quick Login') }
          </button>
        </div>
      </div>
    </div>
  );
};

export const LoginModal = createPlainModal(_LoginModal, 400);