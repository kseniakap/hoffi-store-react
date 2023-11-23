import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaUserFriends,
  FaClipboardList,
  FaAddressCard,
  FaFolderPlus,
  FaCogs,
  FaSignOutAlt,
} from 'react-icons/fa'
import { CustomContext } from '../../Context'
import ICONS from '../../assets/icons'
import IMAGES from '../../assets/img'
import st from './SideBar.module.scss'

const SideBar = () => {
  const { logOutUser } = useContext(CustomContext)
  return (
    <>
      <div className={st.sidebar}>
        <div className={st.top}>
          <a href="/" className={st.logo}>
            <img
              src={ICONS.iconLogoSign}
              alt="logo icon"
              className={st.logoOne}
            />
            <img src={IMAGES.iconLogo} alt="logo" className={st.logoImg} />
          </a>
        </div>
        <div className={st.center}>
          <ul>
            <li>
              <CustomNavLink to="/admin">
                <div>
                  <FaClipboardList className={st.icon} />
                  <span>Дашборд</span>
                </div>
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/admin/users">
                <div>
                  <FaUserFriends />
                  <span>Пользователи</span>
                </div>
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/admin/goods">
                <div>
                  <FaAddressCard />
                  <span>Продукты</span>
                </div>
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/admin/order">
                <div>
                  <FaAddressCard />
                  <span>Заказы</span>
                </div>
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/admin/newgood">
                <div>
                  <FaFolderPlus />
                  <span>Создать новый товар</span>
                </div>
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/" onClick={() => logOutUser()}>
                <div>
                  <FaSignOutAlt />
                  <span>Выйти</span>
                </div>
              </CustomNavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideBar

const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    style={({ isActive, isPending }) => {
      return {
        fontWeight: isActive ? 'bold' : '',
      }
    }}
  >
    {children}
  </NavLink>
)
