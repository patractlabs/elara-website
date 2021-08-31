import React, { useEffect, useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { apiLogin, apiLogout } from '../../core/data/api'
import { delCookie } from '../../shared/utils/index'
import logo from '../../assets/logo.svg'
import signOut from '../../assets/quit.svg'
import { LoginModal } from '../../shared/components/LoginModal'
import { useApi } from '../../core/hooks/useApi'
import { Language } from '../../core/enum'
import LanguageSvg from '../../assets/language.svg'

enum ScrollTarget {
  Home = 'Home',
  Service = 'Service',
  Contact = 'Contact',
}

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { homeHeight, user, setUser, isLogged, setIsLoggged } = useApi()
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)

  const logout = () => {
    apiLogout().then(() => {
      homeHeight.setHeight(0)
      delCookie()
      setIsLoggged(false)
      localStorage.removeItem('user')
    })
    return () => {}
  }

  const scrollTo = (target: ScrollTarget) => {
    switch (target) {
      case ScrollTarget.Home:
        homeHeight.setHeight(0)
        break
      case ScrollTarget.Service:
        const serviceDiv = document.getElementById('home-product')
        homeHeight.setHeight((serviceDiv?.offsetTop || 1360) - 60)
        break
      case ScrollTarget.Contact:
        const footerDiv = document.getElementById('home-footer')
        homeHeight.setHeight((footerDiv?.offsetTop || 2096) - 60)
        break
    }
  }

  const UserMenu = (
    <ul className="user-menu">
      <li className="">
        <Link to="/dashboard/summary">
          <p>{t('user.Level')}</p>
          <h3>{t(`user.${user.level}`)}</h3>
        </Link>
      </li>
      <li className="user-menu-project-counts">
        <Link to="/dashboard/summary">
          <p>{t('user.Projects')}</p>
          <h3>{`${user.projectNum}/${user.maxProjectNum}`}</h3>
        </Link>
      </li>
      <li className="menu-split"></li>
      <li className="user-menu-logout">
        <div className="sign-out" onClick={logout}>
          <img src={signOut} alt="" />
          <span>{t('user.Logout')}</span>
        </div>
      </li>
    </ul>
  )

  const LanguageMenu = (
    <Menu>
      <Menu.Item>
        <p
          onClick={() => i18n.changeLanguage(Language.en)}
          className="changeLanguage"
        >
          English
        </p>
      </Menu.Item>
      <Menu.Item>
        <p
          onClick={() => i18n.changeLanguage(Language.zh)}
          className="changeLanguage"
        >
          中文
        </p>
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    apiLogin()
      .then((_user) => {
        setUser(_user)
        setIsLoggged(true)
        localStorage.setItem('user', JSON.stringify(_user))
      })
      .catch(() => {
        setIsLoggged(false)
        localStorage.removeItem('user')
      })
  }, [setIsLoggged, setUser])

  return (
    <div className="head-main animated fadeInDown">
      <Link
        to="/"
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          marginRight: '30px',
        }}
      >
        <img
          onClick={() => scrollTo(ScrollTarget.Home)}
          src={logo}
          className="logo"
          alt=""
        />
      </Link>
      <div className="head-content">
        <ul className="head-tabs">
          <li>
            <Link to="/" onClick={() => scrollTo(ScrollTarget.Home)}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/summary"
              onClick={() => scrollTo(ScrollTarget.Service)}
            >
              {t('dashboard')}
            </Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.elara.patract.io/"
            >
              {t('Documentation')}
            </a>
          </li>
          <li>
            <Dropdown overlay={LanguageMenu}>
              <img src={LanguageSvg} alt="lang" className="language-icon" />
            </Dropdown>
          </li>
          {isLogged ? (
            <li>
              <Dropdown overlay={UserMenu}>
                <span style={{ cursor: 'pointer' }}>
                  <span style={{ marginRight: '8px' }}>{user.name}</span>
                  <DownOutlined
                    style={{
                      display: 'inline-block',
                    }}
                  />
                </span>
              </Dropdown>
            </li>
          ) : (
            <li>
              <div
                className="login_btn"
                onClick={() => setLoginModalVisible(true)}
              >
                {t('sign.login')}
              </div>
              <LoginModal
                isModalVisible={isLoginModalVisible}
                onModalClose={() => setLoginModalVisible(false)}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
