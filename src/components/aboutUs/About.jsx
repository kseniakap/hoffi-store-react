import React from 'react'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import Img from './photo.jpg'
import imgTel from './imgTel.svg'
import './../../style/style.scss'
import st from './AboutUs.module.scss'


const styles = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

const AboutUs = () => {
  return (
    <section>
      <StyleRoot>
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
      </StyleRoot>
    </section>
  )
}

export default AboutUs
