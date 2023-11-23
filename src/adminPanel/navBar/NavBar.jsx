import React from 'react'
import {
  FaSearch,
  FaGlobe,
  FaMoon,
  FaBell,
  FaRegCommentAlt,
  FaRegListAlt,
} from 'react-icons/fa'
import photoImg from './photo.jpg'
import st from './NavBar.module.scss'

const NavBar = () => {
  return (
    <div className={st.navbar}>
      <div className={st.wrapper}>
        <div className={st.search}>
          <input type="text" placeholder="Поиск..." />
          <FaSearch className={st.icon} />
        </div>
        <div className={st.items}>
          <div className={st.item}>
            <FaGlobe className={st.icon} />
            Eng
          </div>
          <div className={st.item}>
            <FaMoon className={st.icon} />
          </div>
          <div className={st.item}>
            <FaRegListAlt className={st.icon} />
          </div>
          <div className={st.item}>
            <img src={photoImg} alt="фото" className={st.avatar} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
