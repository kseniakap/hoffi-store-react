import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaUserFriends,
  FaClipboardList,
  FaStoreAlt,
  FaAddressCard,
  FaShippingFast,
  FaSortAmountUp,
  FaRegBell,
  FaUserEdit,
  FaCogs,
  FaSignOutAlt,
} from 'react-icons/fa'
import ICONS from '../../assets/icons'
import IMAGES from '../../assets/img'
import st from './SideBar.module.scss'

const SideBar = () => {
  return (
    <>
      <div className={st.sidebar}>
        <div className={st.top}>
          {' '}
          <a href="/" className={st.logo}>
            <img src={ICONS.iconLogoSign} alt="logo icon" />
            <img src={IMAGES.iconLogo} alt="logo" className={st.logoImg} />
          </a>
        </div>
        <div className={st.center}>
          <ul>
            <li>
              <Link to="/admin">
                <FaClipboardList className={st.icon} />
                <span>Дашборд</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <FaUserFriends />
                <span>Пользователи</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/goods">
                <FaAddressCard />
                <span>Продукты</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/order">
                <FaAddressCard />
                <span>Заказы</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/delivery">
                <FaAddressCard />
                <span>Доставка</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/statistics">
                <FaSortAmountUp />
                <span>Статистика</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/delivery">
                <FaRegBell />
                <span>Уведомления</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings">
                <FaCogs />
                <span>Настройки</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/logout">
                <FaSignOutAlt />
                <span>Выйти</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={st.bottom}></div>
      </div>
    </>
  )
}

export default SideBar
