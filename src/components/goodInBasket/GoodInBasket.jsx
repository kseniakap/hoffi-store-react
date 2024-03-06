import React, { useContext, useEffect, useState } from 'react'
import { CustomContext } from './../../Context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import './../../style/style.scss'
import st from './GoodInBasket.module.scss'

//логика страницы заказа
const GoodInBasket = () => {
  const {
    cart,
    deleteCart,
    setCart,
    ticket,
    setTicket,
    formatPrice,
  } = useContext(CustomContext)
  const [totalPrice, setTotalPrice] = useState(0)

  const [showMessage, setShowMessage] = useState(false)

  const getAllTickets = (e) => {
    e.preventDefault()
    axios(
      `${process.env.REACT_APP_SERVER_URL}/tickets?title=${e.target[0].value}`,
    ).then(({ data }) => {
      setTicket(data)
      if (!Array.isArray(data) || data.length === 0) {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 4000)
      }
    })
  }
  const handleCouponInputChange = () => {
    setShowMessage(false)
  }
  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, item) => {
      const itemTotal = item.price * item.count
      if (ticket.length) {
        const discount = (itemTotal / 100) * ticket[0].procent
        return acc + itemTotal - discount
      }
      return acc + itemTotal
    }, 0)

    setTotalPrice(newTotalPrice)
  }, [cart, ticket])

  const handleIncrease = (item) => {
    const updatedCart = [...cart]
    const index = updatedCart.findIndex(
      (el) => el.id === item.id && el.colors === item.colors,
    )
    const maxCount = item.quantity
    if (index !== -1 && updatedCart[index].count < maxCount) {
      updatedCart[index].count += 1
      setCart(updatedCart)
    }
  }

  const handleDecrease = (item) => {
    const updatedCart = [...cart]
    const index = updatedCart.findIndex(
      (el) => el.id === item.id && el.colors === item.colors,
    )
    if (updatedCart[index].count === 1) {
      deleteCart(item.id, item.colors)
    } else {
      updatedCart[index].count -= 1
      setCart(updatedCart)
    }
  }

  return (
    <>
      <div className={st.name_columns}>
        <p>Товар</p>
        <p className={st.columnPrice}>Цена</p>
        <p>Количество</p>
        <p className={st.column}>Цвет</p>
        <p>Всего</p>
      </div>

      {cart.length > 0 ? (
        <>
          <div className={st.wrapper}>
            {cart.map((item, idx) => {
              const { id, name, price, image, colors, count, quantity } = item
              const res = price * count
              const isDisable = count >= quantity
              const path = `${process.env.PUBLIC_URL}/img/${image}`
              let newPath = path
              if (path.startsWith('/img/https://')) {
                newPath = path.substring(5)
              }

              return (
                <div className={st.item} key={idx}>
                  <div
                    className={st.delete}
                    onClick={() => deleteCart(id, colors)}
                  >
                    <span>&#10006;</span>
                  </div>
                  <div className={st.block}>
                    <div className={st.img}>
                      <LazyLoadImage
                        src={newPath}
                        alt="фото заказа"
                        effect="blur"
                      />
                    </div>
                    <p className={st.nameGood}>{name}</p>
                  </div>
                  <p className={st.columnPrice}>{formatPrice(price)} ₽</p>
                  <div className={st.wrapperCounter}>
                    <p className={st.columnPriceAdd}>{formatPrice(price)} ₽</p>
                    <div className={st.counter}>
                      <button
                        className={st.btn}
                        onClick={() => handleDecrease(item)}
                      >
                        <span>-</span>
                      </button>
                      <span>{count}</span>
                      <button
                        className={st.btn}
                        onClick={() => handleIncrease(item)}
                        style={{
                          backgroundColor: isDisable ? 'rgba(0,0,0,.1)' : '',
                          cursor: isDisable ? 'auto' : '',
                        }}
                      >
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                  <p className={st.column}>{colors}</p>
                  <p>{formatPrice(res)} ₽</p>
                </div>
              )
            })}
          </div>
          <hr />
          <div className={st.res}>
            <div className={st.sum}>
              <span>Доставка: 1000 ₽</span>
              <p className={st.delivery}>Бесплатно при заказе от 50 000 ₽</p>
              <div className={st.result}>
                <span> Итого:</span>
                <span style={{ color: totalPrice > 50000 ? 'green' : 'black' }}>
                  {totalPrice.toFixed(2)} ₽
                </span>
              </div>
            </div>
            <Link to="/finish">
              <button className={`${st.btn_orange} ${st.btn_top}`}>
                Оформить заказ
              </button>
            </Link>
          </div>
          <div className={st.ticket}>
            <form onSubmit={getAllTickets}>
              <input
                onChange={handleCouponInputChange}
                type="text"
                placeholder="Введите названию купона"
              />
              <button className={st.btn_orange}>Применить</button>
            </form>

            {Array.isArray(ticket) && ticket.length ? (
              <p>
                По данному промокоду вы получаете скидку в размере{' '}
                {ticket[0].procent} %
              </p>
            ) : (
              <p>*Введите ключевое слово "Hoffi" и вы получите скидку в 10 %</p>
            )}
            {showMessage ? <p>Такого промокода не существует</p> : null}
          </div>
        </>
      ) : (
        <div>
          <p className={st.empty}>Корзина пуста</p>
          <p className={st.text}>
            Купите комплекст из
            <Link to="/onegood/43">журнального стола Бруклин</Link> и стула
            <Link to="/onegood/32"> Белен</Link> в сентябре, и вы получите в
            подарок
            <Link to="/onegood/29"> каркас кровати Бланка</Link>
          </p>
        </div>
      )}
    </>
  )
}

export default GoodInBasket
