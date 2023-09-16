import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import ICONS from './../../assets/icons'
import IMAGES from './../../assets/img'
import './../../style/style.scss'
import st from './Main.module.scss'

const Main = () => {
  const { t } = useTranslation()

  const styles = {
    fadeIn: {
      animation: '2s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
  }

  return (
    <>
      <StyleRoot>
        <div className={st.mainImg}>
          <img
            style={styles.fadeIn}
            src={IMAGES.presentationImg}
            alt="изобрашение в шапке сайта"
          />
        </div>
      </StyleRoot>
      <div className={st.mainImgText}>
        <div className="container">
          <h1 className={`title ${st.title}`}>{t('homePage.mainImg.title')}</h1>
          <p
            className={`text-descr ${st.text_descr}`}
            dangerouslySetInnerHTML={{
              __html: t('homePage.mainImg.subtitle'),
            }}
          />
        </div>
      </div>

      <section className={st.plans}>
        <div className="container">
          <div className={st.list}>
            <div className={st.item}>
              <div className={st.item__title}>Project Plan</div>
              <div className={`text-descr ${st.item__descr}`}>
                There are many variations of the passages of lorem Ipsum from
                available, majority.
              </div>
              <a className={st.item__link} href="/">
                Смотреть больше
                <img src={ICONS.iconArrow} alt="стрелка" />
              </a>
            </div>
            <div className={st.item}>
              <div className={st.item__title}>Project Plan</div>
              <div className={`text-descr ${st.item__descr}`}>
                There are many variations of the passages of lorem Ipsum from
                available, majority.
              </div>
              <a className={st.item__link} href="/">
                Смотреть больше
                <img src={ICONS.iconArrow} alt="стрелка" />
              </a>
            </div>
            <div className={st.item}>
              <div className={st.item__title}>Project Plan</div>
              <div className={`text-descr ${st.item__descr}`}>
                There are many variations of the passages of lorem Ipsum from
                available, majority.
              </div>
              <a className={st.item__link} href="/">
                Смотреть больше
                <img src={ICONS.iconArrow} alt="arrrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className={st.wrapper}>
            <div className={st.content}>
              <h1 className="title"> {t('homePage.mainContent.title')}</h1>
              <p
                className={st.descr}
                dangerouslySetInnerHTML={{
                  __html: t('homePage.mainContent.descr'),
                }}
              ></p>
              <div className={st.tel}>
                <a href="tel:89103022000" className={st.imgTel}>
                  <img src={ICONS.imgTel} alt="картинка телефона" />
                </a>
                <div className={st.telNum}>
                  <span>
                    <a href="tel:89103022000" className={st.number}>
                      8-910-302-20-00
                    </a>
                  </span>
                  <span> {t('homePage.mainContent.signature')}</span>
                </div>
              </div>
            </div>
            <img className={st.img} src={IMAGES.interiorPhoto} alt="about us" />
          </div>
        </div>
      </section>
      <section className={st.brand}>
        <div className="container">
          <div className={st.brandWrapper}>
            <img src={ICONS.iconHome} alt="брэнд Home" />
            <img src={ICONS.iconStyleVintage} alt="брэнд StyleVintage" />
            <img src={ICONS.iconBrand} alt="брэнд Brand" />
            <img src={ICONS.iconNatureHome} alt="брэнд NatureHome" />
            <img src={ICONS.iconClassic} alt="брэнд Classic" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
