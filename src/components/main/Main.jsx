import React, { useContext, useState } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import TypingEffect from '../../AnimatedText'
import { fadeIn } from 'react-animations'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
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
          <LazyLoadImage
            style={styles.fadeIn}
            src={IMAGES.presentationImg}
            alt="изобрашение в шапке сайта"
            effect="blur"
            height={600}
            width="100%"
          />
        </div>
      </StyleRoot>
      <div className={st.mainImgText}>
        <div className="container">
          <TypingEffect text={t('homePage.mainImg.title')} />

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
              <div className={st.item__title}>Товары</div>
              <div className={`text-descr ${st.item__descr}`}>
                Здесь вы можете ознакомиться со всем ассортиментом
              </div>
              <a className={st.item__link} href="/goods">
                Перейти
                <img src={ICONS.iconArrow} alt="стрелка" />
              </a>
            </div>
            <div className={st.item}>
              <div className={st.item__title}>Наша главная задача</div>
              <div className={`text-descr ${st.item__descr}`}>
                Создать уют в вашем доме по разумной цене
              </div>
              <a className={st.item__link} href="/about">
                Читать больше
                <img src={ICONS.iconArrow} alt="стрелка" />
              </a>
            </div>
            <div className={st.item}>
              <div className={st.item__title}>Команда</div>
              <div className={`text-descr ${st.item__descr}`}>
                В нашей команде работают только опытные специалисты
              </div>
              <a className={st.item__link} href="/team">
                Ознакомиться
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
                  <img
                    src={ICONS.imgTel}
                    alt="картинка телефона"
                    effect="blur"
                  />
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
            <div className={st.imageWrapper}>
              <LazyLoadImage
                className={st.img}
                src={IMAGES.interiorPhoto}
                alt="about us"
                effect="blur"
              />
            </div>
          </div>
        </div>
      </section>
      <section className={st.brand}>
        <div className="container">
          <div className={st.brandWrapper}>
            <LazyLoadImage
              src={ICONS.iconHome}
              alt="брэнд Home"
              effect="blur"
            />
            <LazyLoadImage
              src={ICONS.iconStyleVintage}
              alt="брэнд StyleVintage"
              effect="blur"
            />
            <LazyLoadImage
              src={ICONS.iconBrand}
              alt="брэнд Brand"
              effect="blur"
            />
            <LazyLoadImage
              src={ICONS.iconNatureHome}
              alt="брэнд NatureHome"
              effect="blur"
            />
            <LazyLoadImage
              src={ICONS.iconClassic}
              alt="брэнд Classic"
              effect="blur"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
