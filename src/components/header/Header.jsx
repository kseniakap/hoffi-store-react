import React, { useState, useContext, useRef, useEffect } from 'react'
import { CustomContext } from '../../Context'
import { Link, NavLink } from 'react-router-dom'
import { FaBasketShopping } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import OrderList from '../orderList/OrderList'
import ICONS from '../../assets/icons'
import IMAGES from '../../assets/img'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order }) => {
  const { user, logOutUser, cardOpen, setCardOpen } = useContext(CustomContext)
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <header>
      <div className="container">
        <div className={st.header}>
          <a href="/" className={st.logo}>
            <img src={ICONS.iconLogoSign} alt="logo icon" />
            <img src={IMAGES.iconLogo} alt="logo" className={st.logoImg} />
          </a>
          <div>
            <nav>
              <ul className={st.list}>
                <li>
                  <CustomNavLink to="/">
                    {t('homePage.headerMenu.link1')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/about">
                    {t('homePage.headerMenu.link2')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/goods">
                    {t('homePage.headerMenu.link3')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/team">
                    {t('homePage.headerMenu.link4')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/login">
                    {t('homePage.headerMenu.link6')}
                  </CustomNavLink>
                </li>
              </ul>

              <FaBasketShopping
                onClick={() => setCardOpen(!cardOpen)}
                className={`basket ${cardOpen && 'active'}`}
              />
            </nav>
          </div>
          <OrderList order={order} />
          <div className={st.language}>
            <button
              type="button"
              data-lang="ru"
              className={currentLanguage === 'ru' ? 'active-lang' : ''}
              onClick={() => changeLanguage('ru')}
            >
              ru
            </button>
            <span>/</span>
            <button
              type="button"
              data-lang="en"
              className={currentLanguage === 'en' ? 'active-lang' : ''}
              onClick={() => changeLanguage('en')}
            >
              en
            </button>
          </div>
          <div className={st.entranceExit}>
            {user && user.login && user.login.length ? (
              <Link to="/" onClick={() => logOutUser()}>
                {t('homePage.headerMenu.logOut')}
              </Link>
            ) : (
              <Link to="/login"> {t('homePage.headerMenu.loginIn')}</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    style={({ isActive, isPending }) => {
      return {
        fontWeight: isActive ? 'bold' : '',
      }
    }}
  >
    {children}
  </NavLink>
)
