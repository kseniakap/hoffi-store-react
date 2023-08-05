import React from 'react'

import st from './Header.module.scss'

const Header = () => {
  return (
    <header>
      <div>
        <span className={st.logo}>Hoff</span>
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
      </div>
      <div className={st.presentation}></div>
    </header>
  )
}

export default Header
