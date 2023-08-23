import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBasketShopping } from 'react-icons/fa6'
import Order from '../order/Order'

import { MainPage, About, Contacts, Page404 } from './../pages'

import logoImg from './../../assets/img/logo.png'
import logoIcon from './logo_img.svg'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order, setOrder, deleteOrder, numberOfOrder }) => {
  const [cardOpen, setCardOpen] = useState(false)

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
      <div className={st.header}>
        <a href="/" className={st.logo}>
          <img src={logoIcon} alt="logo icon" />
          <img src={logoImg} alt="logo" className={st.logoImg} />
        </a>
        <div>
          <nav >
            <ul className={st.list} >
             <li>
                <CustomNavLink to="/">Главная</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/about">Про нас</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/goods">Товары</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/contacts">Контакты</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/account">Кабинет</CustomNavLink>
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
        fontWeight: isActive ? "bold" : "",
      };
    }}
  >
    {children}
  </NavLink>
);