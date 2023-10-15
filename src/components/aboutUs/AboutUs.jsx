import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import ICONS from './../../assets/icons'
import IMAGES from '../../assets/img'
import st from './AboutUs.module.scss'

const AboutUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { t } = useTranslation()

  const [blockStyle, setBlockStyle] = useState({
    position: 'absolute',
    top: '0px',
    left: '50%',
    transition: 'left 3s ease-out',
  })

  const [blockStyleRight, setBlockStyleRight] = useState({
    position: 'absolute',
    top: '0px',
    right: '50%',
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
          <q>{t('aboutUsPage.quote')}</q>
          <p>&#8212; Giorgio Saporiti</p>
        </div>
      </div>

      <section className={st.aboutWork}>
        <div className="container">
          <div className={st.aboutWork__block}>
            <div className={st.aboutWork__info}>
              <h2 className={`title ${st.aboutWork__title}`}>
                {t('aboutUsPage.aboutWork.sectionOne.title')}
              </h2>
              <p className="text-descr">
                {t('aboutUsPage.aboutWork.sectionOne.descr')}
              </p>
              <NavLink to="/team">
                {t('aboutUsPage.aboutWork.sectionOne.link')}
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
                {t('aboutUsPage.aboutWork.sectionTwo.title')}
              </h2>
              <p className="text-descr">
                {t('aboutUsPage.aboutWork.sectionTwo.descr')}
              </p>
              <NavLink to="/goods">
                {t('aboutUsPage.aboutWork.sectionTwo.link')}
                <img src={ICONS.iconArrow} alt="arrow" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
   
    </>
  )
}

export default AboutUs
