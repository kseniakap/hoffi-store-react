import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ICONS from './../../assets/icons'
import IMAGES from '../../assets/img'
import st from './AboutUs.module.scss'

const AboutUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const [blockStyle, setBlockStyle] = useState({
    position: 'absolute',
    top: '0px',
    left: '60%',
    transition: 'left 3s ease-out',
  })

  const [blockStyleRight, setBlockStyleRight] = useState({
    position: 'absolute',
    top: '0px',
    right: '60%',
    transition: 'right 3s ease-out',
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
      <div className="container">
        <div className={st.quote}>
          <img src={ICONS.iconQuote} alt="quote" className={st.quote__img} />
          <q>
            В хорошем дизайне функциональность всегда первична, независимо от
            форм. Но она не должна угнетать эмоции
          </q>
          <p>&#8212; Giorgio Saporiti</p>
        </div>
      </div>

      <section className={st.aboutWork}>
        <div className="container">
          <div className={st.aboutWork__block}>
            <div className={st.aboutWork__info}>
              <h2 className={`title ${st.aboutWork__title}`}>Что мы делаем</h2>
              <p className="text-descr">
                Наша главная задача — это создание уюта в вашем доме. Мы создаем
                мебель, которая отлично впишется в ваш интерьер
              </p>
              <NavLink to="/team">
                Наша команда
                <img src={ICONS.iconArrow} alt="arrow" />
              </NavLink>
            </div>
            <div style={blockStyle} className={st.aboutWork__img}>
              <img src={IMAGES.aboutWorkImg_1} alt="наша мебель" />
            </div>
          </div>
          <div className={`${st.aboutWork__block} ${st.aboutWork__block_2}`}>
            <div style={blockStyleRight} className={st.aboutWork__img}>
              <img src={IMAGES.aboutWorkImg_2} alt="наша мебель" />
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
              <NavLink to="/goods">
                К товару
                <img src={ICONS.iconArrow} alt="arrow" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <section className={st.team}></section>
    </>
  )
}

export default AboutUs
