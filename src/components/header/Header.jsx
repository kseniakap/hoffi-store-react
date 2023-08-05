import React, { useState } from 'react'
import { FaBasketShopping } from 'react-icons/fa6'
import logoImg from './../../assets/img/logo.png'
import './../../style/style.scss'
import st from './Header.module.scss'

const Header = () => {
  const [cardOpen, setCardOpen] = useState(false)

  return (
    <header>
      <div className={st.header}>
        <a href="/">
          <img src={logoImg} alt="logo" className={st.logo} />
        </a>
        <div>
          <ul className={st.list}>
            <li>
              <a href="/">Про нас</a>
            </li>
            <li>
              <a href="/">Контакты</a>
            </li>
            <li>
              <a href="/">Кабинет</a>
            </li>
          </ul>
          <FaBasketShopping
            onClick={() => setCardOpen(!cardOpen)}
            className={`basket ${cardOpen && 'active'}`}
          />
        </div>
        {cardOpen && <div className={st.shop__list}>Backet</div>}
      </div>
      <div className={st.presentation}></div>
    </header>
  )
}

export default Header
