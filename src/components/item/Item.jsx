import React, { useContext, useRef } from 'react'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import st from './Item.module.scss'

const Item = ({ list, addToOrder }) => {
  const { id, name, description, price, newPrice, colors } = list

  const firstImg = colors && colors[0].image
  const { formatPrice, setCardOpen } = useContext(CustomContext)

  const handleAddToOrder = (event) => {
    event.preventDefault()
    addToOrder(list)
    setCardOpen(true)
  }
  const totalCount = colors.reduce(
    (accumulator, color) => accumulator + color.count,
    0,
  )
  return (
    <>
      <Link to={`/onegood/${id}`} className={st.item}>
        <img
          className={st.img}
          src={`${process.env.PUBLIC_URL}/img/${firstImg}`}
          alt={name}
        />
        <div className={st.content}>
          <h2 className={st.name}>{name}</h2>
          <p className={st.descr}>{description}</p>
          <div className={st.price}>
            {newPrice ? (
              <>
                <span style={{ textDecoration: 'line-through' }}>
                  {formatPrice(price)}₽
                </span>
                <span> / </span>
                <span>{formatPrice(newPrice)} ₽</span>
              </>
            ) : (
              <p>{formatPrice(price)} ₽</p>
            )}
          </div>
          {totalCount ? (
            <div className={st.add} onClick={handleAddToOrder}>
              +
            </div>
          ) : (
            <p className={st.instock}>Нет в наличии</p>
          )}
        </div>
      </Link>
    </>
  )
}

export default Item
