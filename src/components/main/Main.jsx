import React from 'react'
import { useTranslation } from 'react-i18next'
import TypingEffect from '../../AnimatedText'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import ICONS from './../../assets/icons'
import IMAGES from './../../assets/img'
import './../../style/style.scss'
import st from './Main.module.scss'

const Main = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className={st.mainImg}>
        <div className="container">
          <div className={st.mainImgText}>
            <TypingEffect text={t('homePage.mainImg.title')} />
            <p
              className={`text-descr ${st.text_descr}`}
              dangerouslySetInnerHTML={{
                __html: t('homePage.mainImg.subtitle'),
              }}
            />
          </div>
        </div>
      </div>

      <section className={st.plans}>
        <div className="container">
          <div className={st.list}>
            <div className={st.item}>
              <div className={st.item__title}>
                {t('homePage.blockafterImg.taskOne.title')}
              </div>
              <div className={`text-descr ${st.item__descr}`}>
                {t('homePage.blockafterImg.taskOne.descr')}
              </div>
              <a className={st.item__link} href="/goods">
                {t('homePage.blockafterImg.taskOne.link')}
                <img src={ICONS.iconArrow} alt="стрелка" />
              </a>
            </div>
            <div className={st.item}>
              <div className={st.item__title}>
                {' '}
                {t('homePage.blockafterImg.taskTwo.title')}
              </div>
              <div className={`text-descr ${st.item__descr}`}>
                {t('homePage.blockafterImg.taskTwo.descr')}
              </div>
              <a className={st.item__link} href="/about">
                {t('homePage.blockafterImg.taskTwo.link')}
                <img src={ICONS.iconArrow} alt="стрелка" />
              </a>
            </div>
            <div className={st.item}>
              <div className={st.item__title}>
                {t('homePage.blockafterImg.taskThree.title')}
              </div>
              <div className={`text-descr ${st.item__descr}`}>
                {t('homePage.blockafterImg.taskThree.descr')}
              </div>
              <a className={st.item__link} href="/team">
                {t('homePage.blockafterImg.taskThree.link')}
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
              className={st.BrandVs}
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
