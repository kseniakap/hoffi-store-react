import React from 'react'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import Img from './photo.jpg'
import MainImgHeader from './../../assets/img/presentation.jpg'
import imgTel from './imgTel.svg'
import arrowImg from './../../assets/img/arrow.svg'
import './../../style/style.scss'
import st from './Main.module.scss'

const styles = {
  fadeIn: {
    animation: '2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
}
const Main = () => {
  return (
    <>
      <div className={st.mainImg}>
        <img
          style={styles.fadeIn}
          src={MainImgHeader}
          alt="изобрашение в шапке сайта"
        />
        <h1 className={`title ${st.title}`}>Лучшие товары для вашего дома</h1>
        <p className={`text-descr ${st.text_descr}`}>
          Широкий выбор стилей и комплектаций в наличии
        </p>
      </div>
      <section>
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
                <img src={arrowImg} alt="arrrow" />
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
                <img src={arrowImg} alt="arrrow" />
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
                <img src={arrowImg} alt="arrrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <StyleRoot>
          <div className="container">
            <div className={st.wrapper}>
              <div className={st.content}>
                <h1 className="title"> Дом для создания интерьера</h1>
                <p className={st.descr}>
                  — Расшифровывается как "Home of furnishing", что в дословном
                  переводе означает — "Дом для создания интерьера" <br /> <br />
                  Сеть гипермаркетов Hoff — это одна из крупнейших российских и
                  динамично развивающихся мебельных сетей. Это единственная
                  российская сеть мебели и аксессуаров для дома, работающая в
                  формате гипермаркета.
                </p>
                <div className={st.tel}>
                  <a href="tel:89103022000" className={st.imgTel}>
                    <img src={imgTel} alt="картинка телефона" />
                  </a>
                  <div className={st.telNum}>
                    <span>
                      <a href="tel:89103022000" className={st.number}>
                        8-910-302-20-00
                      </a>
                    </span>
                    <span>Позвонить прямо сейчас</span>
                  </div>
                </div>
              </div>
              <img
                style={styles.fadeIn}
                className={st.img}
                src={Img}
                alt="about us"
              />
            </div>
          </div>
        </StyleRoot>
      </section>
    </>
  )
}

export default Main
