import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CustomContext } from '../../Context'
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
  const { setSearchGoods, setSearchUserEmail, setSearchUserByName, setSearchOrder} = useContext(CustomContext)
  const location = useLocation()
  return (
    <div className={st.navbar}>
      <div className={st.wrapper}>
        {location.pathname.includes('/goods') && (
          <div className={st.search}>
            <input
              type="text"
              placeholder="Поиск товара по названию"
              onChange={(e) => setSearchGoods(e.target.value)}
            />
            <FaSearch className={st.icon} />
          </div>
        )}
        {location.pathname.includes('/users') && (
          <>
            {' '}
            <div className={st.search}>
              <input
                type="text"
                placeholder="Поиск пользователей по имени"
                onChange={(e) => setSearchUserByName(e.target.value)}
              />
              <FaSearch className={st.icon} />
            </div>
            <div className={st.search}>
              <input
                type="text"
                placeholder="Поиск пользователей по почте"
                onChange={(e) => setSearchUserEmail(e.target.value)}
              />
              <FaSearch className={st.icon} />
            </div>
          </>
        )}
        {location.pathname.includes('/order') && (
          <div className={st.search}>
            <input
              type="text"
              placeholder="Поиск заказа по названию"
              onChange={(e) => setSearchOrder(e.target.value)}
            />
            <FaSearch className={st.icon} />
          </div>
        )}

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
