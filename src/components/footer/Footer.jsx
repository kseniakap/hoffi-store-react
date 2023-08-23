import React from 'react'
import st from './Footer.module.scss';
import './../../style/style.scss'

const Footer = () => {
  return (
    <footer >
      <div className="container">
        <div className={st.wrapper}>
          &copy;Ноff, 2009–2023</div>
        </div>
    </footer>
  )
}

export default Footer
