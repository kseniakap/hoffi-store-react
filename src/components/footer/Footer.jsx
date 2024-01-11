import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import ICONS from '../../assets/icons'
import IMAGES from '../../assets/img'
import st from './Footer.module.scss'
import {NavLink } from 'react-router-dom'
import './../../style/style.scss'

const Footer = () => {
  const { user } = useContext(CustomContext)
  const { t } = useTranslation()
  return (
    <footer>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.descrWrap}>
            <a href="/" className={st.logo}>
              <img
                src={ICONS.iconLogoSign}
                alt="logo icon"
                className={st.logoOne}
              />
              <img src={IMAGES.iconLogo} alt="logo" className={st.logoImg} />
            </a>
            <p className={st.descr}>{t('Footer.quote')}</p>
            <p>© Ноff, 2009–2023</p>
          </div>
          <div className={st.list}>
            <p>{t('homePage.headerMenu.pages')}</p>
            <ul>
              <li>
                <CustomNavLink to="/">
                  {t('homePage.headerMenu.link1')}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/goods">
                  {t('homePage.headerMenu.link3')}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/about">
                  {t('homePage.headerMenu.link2')}
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
              {user.email === 'admin@gmail.com' && (
                <li>
                  <CustomNavLink to="/admin">
                    {t('homePage.headerMenu.link6')}
                  </CustomNavLink>
                </li>
              )}
            </ul>
          </div>

          <ul className={st.list}>
            <li>
              <p> {t('Footer.additional')}</p>
            </li>
            <li>
              <address>{t('Footer.address')}</address>
            </li>
            <li>
              <a href="mailto:hoffi@mail.ru">hoffi@mail.ru</a>
            </li>
            <li>
              <a href="tel:89564858534">8-956-485-85-34</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

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
