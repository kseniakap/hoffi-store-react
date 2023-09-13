import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import st from './HeaderComponents.module.scss'

const HeaderComponents = ({ pageTitle, headerImage, activeLink }) => {
  const { t } = useTranslation()
  const styles = {
    fadeIn: {
      animation: 'x 2s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
  }

  return (
    <StyleRoot>
      <div className={st.header__img}>
        <img
          style={styles.fadeIn}
          src={headerImage}
          alt="картинка в шапке сайта"
        />
        <div className={st.header__block}>
          <h1 className={`title ${st.title}`}>{pageTitle}</h1>
          <span>
            <NavLink
              to="/"
              style={({ isActive, isPending }) => ({
                color: isActive ? '#a5a5a5' : 'black',
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: isActive ? 'none' : 'auto',
              })}
            >
              {t('homePage.headerMenu.link1')}
            </NavLink>
          </span>
          <span>/</span>
          <span>
            <NavLink
              to={activeLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? '#a5a5a5' : 'black',
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: isActive ? 'none' : 'auto',
              })}
            >
              {pageTitle}
            </NavLink>
          </span>
        </div>
      </div>
    </StyleRoot>
  )
}

export default HeaderComponents
