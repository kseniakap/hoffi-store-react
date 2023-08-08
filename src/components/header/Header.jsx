import React, { useState } from 'react'
import { FaBasketShopping } from 'react-icons/fa6'
import Order from '../order/Order'

import logoImg from './../../assets/img/logo.png'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order, setOrder, deleteOrder, numberOfOrder }) => {
  const [cardOpen, setCardOpen] = useState(false)

  const showOrders = (order) => {
    let sum = 0
    order.forEach((el) => (sum += el.price * el.count))
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
          <span>
            Итого:{' '}
            <span style={{ color: sum > 50000 ? 'green' : 'black' }}>
              {' '}
              {sum} ₽
            </span>
          </span>
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
