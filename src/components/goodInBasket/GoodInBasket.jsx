import React, { useContext, useEffect, useState } from 'react'
import { CustomContext } from './../../Context'
import './../../style/style.scss'
import st from './GoodInBasket.module.scss'

const GoodInBasket = () => {
  const { cart, deleteCart, setCart, setIsDisable } = useContext(CustomContext)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, item) => {
      const { price, count } = item
      return acc + price * count
    }, 0)
    setTotalPrice(newTotalPrice)
  }, [cart])

  const handleIncrease = (item) => {
    const updatedCart = [...cart]
    const index = updatedCart.findIndex(
      (el) => el.id === item.id && el.colors === item.colors,
    )

    const maxCount = item.colors.quantity
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
      <h2 className="title">Корзина</h2>
      <div className={st.name_columns}>
        <p>Товар</p>
        <p>Цена</p>
        <p>Количество</p>
        <p>Цвет</p>
        <p>Всего</p>
      </div>

      {cart.length > 0 ? (
        <>
          <div className={st.wrapper}>
            {cart.map((item, idx) => {
              const { id, name, price, image, colors, count } = item
              const res = price * count
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
                      <img
                        src={`${process.env.PUBLIC_URL}/img/${image}`}
                        alt="фото заказа"
                      />
                    </div>
                    <p>{name}</p>
                  </div>
                  <p>{price}</p>
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
                    >
                      <span>+</span>
                    </button>
                  </div>
                  <p>{colors}</p>
                  <p>{res} р</p>
                </div>
              )
            })}
          </div>
          <hr />
          <div className={st.sum}>
            <span>Доставка:</span>
            <p className={st.delivery}>Бесплатно при заказе от 50 000 ₽</p>
            <div className={st.result}>
              <span> Итого:</span>
              <span style={{ color: totalPrice > 50000 ? 'green' : 'black' }}>
                {totalPrice.toString().slice(0, -3) +
                  ' ' +
                  totalPrice.toString().slice(-3)}{' '}
                ₽
              </span>
            </div>
          </div>
        </>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </>
  )
}

export default GoodInBasket
