import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import AboutUsHeader from './aboutUs_header.jpg'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import quoteImg from './../../assets/img/arrow.svg'
import workImg1 from './aboutWok_img-1.jpg'
import workImg2 from './aboutWork_img-2.jpg'
import arrowImg from './../main/arrow.svg'

import st from './AboutUs.module.scss'

const styles = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
}

const AboutUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [blockStyle, setBlockStyle] = useState({
    position: 'absolute',
    top: '0px',
    left: '60%',
    transition: 'left 0.5s ease-out',
  })

  const [blockStyleRight, setBlockStyleRight] = useState({
    position: 'absolute',
    top: '0px',
    right: '60%',
    transition: 'right 0.5s ease-out',
  })
  const handleScroll = () => {
    const currentScrollPosition = window.scrollY
    setScrollPosition(currentScrollPosition)
    const widthPercentage =
      currentScrollPosition / (document.body.scrollHeight - window.innerHeight)

    setBlockStyle({
      position: 'absolute',
      top: '0px',
      left: `${5 + widthPercentage * 100}%`,
      transition: 'left 3s ease-out',
    })
  }

  const handleScrollRight = () => {
    const currentScrollPosition = window.scrollY
    setScrollPosition(currentScrollPosition)
    const widthPercentage =
      currentScrollPosition / (document.body.scrollHeight - window.innerHeight)

    setBlockStyleRight({
      position: 'absolute',
      top: '0px',
      right: `${5 + widthPercentage * 100}%`,
      transition: 'right 3s ease-out',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScrollRight)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScrollRight)
    }
  }, [])

  return (
    <>
      <StyleRoot>
        <div className={st.header__img}>
          <img
            style={styles.fadeIn}
            src={AboutUsHeader}
            alt="картинка в шапке сайта"
          />
          <div className={st.header__block}>
            <h1 className={`title ${st.title}`}>Про нас</h1>
            <span>
              <NavLink
                to="/"
                style={({ isActive, isPending }) => ({
                  color: isActive ? '#a5a5a5' : 'black',
                  cursor: isActive ? 'default' : 'pointer',
                  pointerEvents: isActive ? 'none' : 'auto',
                })}
              >
                Главная
              </NavLink>
            </span>
            <span>/</span>
            <span>
              <NavLink
                to="/about"
                style={({ isActive, isPending }) => ({
                  color: isActive ? '#a5a5a5' : 'black',
                  cursor: isActive ? 'default' : 'pointer',
                  pointerEvents: isActive ? 'none' : 'auto',
                })}
              >
                Про нас
              </NavLink>
            </span>
          </div>
        </div>
        <div className="container">
          <div className={st.quote}>
            <img src={quoteImg} alt="quote" className={st.quote__img} />
            <q>
              В хорошем дизайне функциональность всегда первична, независимо от
              форм. Но она не должна угнетать эмоции
            </q>
            <p>&#8212; Giorgio Saporiti</p>
          </div>
        </div>
      </StyleRoot>
      <section className={st.aboutWork}>
        <div className="container">
          <div className={st.aboutWork__block}>
            <div className={st.aboutWork__info}>
              <h2 className={`title ${st.aboutWork__title}`}>Что мы делаем</h2>
              <p className="text-descr">
                Наша главная задача — это создание уюта в вашем доме. Мы создаем
                мебель, которая отлично впишется в ваш интерьер
              </p>
              <a href="/">
                Наша команда
                <img src={arrowImg} alt="arrow" />
              </a>
            </div>
            <div style={blockStyle} className={st.aboutWork__img}>
              <img src={workImg1} alt="наша мебель" />
            </div>
          </div>
          <div className={`${st.aboutWork__block} ${st.aboutWork__block_2}`}>
            <div style={blockStyleRight} className={st.aboutWork__img}>
              <img src={workImg2} alt="наша мебель" />
            </div>
            <div className={st.aboutWork__info}>
              <h2 className={`title ${st.aboutWork__title}`}>
                Наше преимущество
              </h2>
              <p className="text-descr">
                Мы напрямую работаем с проверенными мебельными фабриками и
                делаем недорогую мебель на собственном производстве, поэтому
                наши цены по-настоящему низкие. В нашем каталоге каждый сможет
                найти мебель по вкусу и купить ее по низкой цене.
              </p>
              <a href="/">
                К товару
                <img src={arrowImg} alt="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className={st.team}></section>
    </>
  )
}

export default AboutUs
