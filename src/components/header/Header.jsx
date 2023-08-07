import React, { useState } from 'react'
import { FaBasketShopping } from 'react-icons/fa6'
import Order from '../order/Order'

import logoImg from './../../assets/img/logo.png'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order, deleteOrder }) => {
  const [cardOpen, setCardOpen] = useState(false)

  const showOrders = (order) => {
    let sum = 0
    order.forEach((el) => (sum += el.price))
    return (
      <div>
        {order.map((el) => (
          <Order key={el.id} item={el} deleteOrder={deleteOrder} />
        ))}
        <p className={st.sum}>
          <span>Итого: </span>
          {sum} ₽
        </p>
      </div>
    )
  }

  const showNothing = () => {
    return (
      <div>
        <h2 className={st.basket}>Ваша корзина пуста</h2>
      </div>
    )
  }

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
        {cardOpen && (
          <div className={st.shop__list}>
            <h2 className={st.title}>Ваша корзина</h2>
            {order.length > 0 ? showOrders(order) : showNothing()}
          </div>
        )}
      </div>
      <div className={st.presentation}></div>
    </header>
  )
}

export default Header
