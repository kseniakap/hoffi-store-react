import React, { useState, useContext } from 'react'
import { CustomContext } from '../../Context'
import { Link, NavLink } from 'react-router-dom'
import { FaBasketShopping } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import Order from '../order/Order'
import ICONS from '../../assets/icons'
import IMAGES from '../../assets/img'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order, setOrder, deleteOrder, numberOfOrder }) => {
  const [cardOpen, setCardOpen] = useState(false)

  const { user, logOutUser } = useContext(CustomContext)

  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  const showOrders = (order) => {
    let sum = 0
    order.forEach((el) => (sum += Number(el.price) * el.count))
    return (
      <div>
        {order &&
          order.map((el) => (
            <Order
              order={order}
              setOrder={setOrder}
              key={el.id}
              item={el}
              deleteOrder={deleteOrder}
              numberOfOrder={numberOfOrder}
            />
          ))}
        <div className={st.sum}>
          <span>Доставка:</span>
          <p className={st.delivery}>Бесплатно при заказе от 50 000 ₽</p>
          <div className={st.result}>
            <span> Итого:</span>
            <span style={{ color: sum > 50000 ? 'green' : 'black' }}>
              {sum.toString().slice(0, -3) + ' ' + sum.toString().slice(-3)} ₽
            </span>
          </div>
        </div>
      </div>
    )
  }

  const showNothing = () => {
    return (
      <div>
        <h2 className={st.basket}>Корзина пуста</h2>
        <p className={st.text}>
          Купите комплекст из <a href="/">журнального стола Бруклин</a> и стула{' '}
          <a href="/">Белен</a> в сентябре, и вы получите в подарок
          <a href="/"> каркас кровати Бланка</a>
        </p>
      </div>
    )
  }

  return (
    <header>
      <div className="container">
        <div className={st.header}>
          <a href="/" className={st.logo}>
            <img src={ICONS.iconLogoSign} alt="logo icon" />
            <img src={IMAGES.iconLogo} alt="logo" className={st.logoImg} />
          </a>
          <div>
            <nav>
              <ul className={st.list}>
                <li>
                  <CustomNavLink to="/">
                    {t('homePage.headerMenu.link1')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/about">
                    {t('homePage.headerMenu.link2')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/goods">
                    {t('homePage.headerMenu.link3')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/team">
                    {t('homePage.headerMenu.link4')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/contacts">
                    {t('homePage.headerMenu.link5')}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/login">
                    {t('homePage.headerMenu.link6')}
                  </CustomNavLink>
                </li>
              </ul>

              <FaBasketShopping
                onClick={() => setCardOpen(!cardOpen)}
                className={`basket ${cardOpen && 'active'}`}
              />
            </nav>
          </div>
          {cardOpen && (
            <div className={st.shop__list}>
              <h2 className={st.title}>Ваша корзина</h2>
              {order.length > 0 ? showOrders(order) : showNothing()}
            </div>
          )}
          <div className={st.language}>
            <button
              type="button"
              data-lang="ru"
              className={currentLanguage === 'ru' ? 'active-lang' : ''}
              onClick={() => changeLanguage('ru')}
            >
              ru
            </button>
            <span>/</span>
            <button
              type="button"
              data-lang="en"
              className={currentLanguage === 'en' ? 'active-lang' : ''}
              onClick={() => changeLanguage('en')}
            >
              en
            </button>
          </div>
          <div className={st.entranceExit}>
            {user && user.login && user.login.length ? (
              <Link to="/" onClick={() => logOutUser()}>
                {t('homePage.headerMenu.logOut')}
              </Link>
            ) : (
              <Link to="/login"> {t('homePage.headerMenu.loginIn')}</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

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
