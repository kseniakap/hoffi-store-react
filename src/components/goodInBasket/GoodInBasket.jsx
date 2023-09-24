import React, { useContext } from 'react'
import { CustomContext } from './../../Context'
import IMAGES from '../../assets/img'
import './../../style/style.scss'
import st from './GoodInBasket.module.scss'

const GoodInBasket = () => {
  const { cart, deleteCart } = useContext(CustomContext)

  return (
    <>
      <h2 className={st.title}>Корзина</h2>
      <div className={st.name_columns}>
        <p>Товар</p>
        <p>Цена</p>
        <p>Количество</p>
        <p>Цвет</p>
        <p>Всего</p>
      </div>
      <div className={st.wrapper}>
        {cart.map((item, idx) => {
          const { id, name, price, image, colors, count } = item
          const res = price * count
          return (
            <div className={st.item} key={idx}>
              <div className={st.delete} onClick={() => deleteCart(id, colors)}>
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
              <p>{count}</p>
              <p>{colors}</p>
              <p>{res} р</p>
            </div>
          )
        })}
      </div>
      <hr />
    </>
  )
}

export default GoodInBasket
