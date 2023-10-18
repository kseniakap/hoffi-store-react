import React, { useContext, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import st from './Order.module.scss'

const Order = ({ item }) => {
  const { deleteCart, updateTotalPrice } = useContext(CustomContext)
  const { id, name, price, colors, count, image } = item
  const [countGoods, setCountGoods] = useState(count)
  const [isDisable, setIsDisable] = useState(false)

  const s = String(price)

  const handleIncrease = (e) => {
    e.preventDefault()
    if (item.quantity > item.count) {
      item.count += 1
      setCountGoods(item.count)
      updateTotalPrice()
    } else {
      setIsDisable(true)
    }
  }

  const handleDecrease = (e) => {
    e.preventDefault()
    if (item.count === 1) {
      deleteCart(item.id, colors)
    } else {
      item.count -= 1
      setCountGoods(item.count)
      setIsDisable(false)
      updateTotalPrice()
    }
  }
  const path = `${process.env.PUBLIC_URL}/img/${image}`
  let newPath = path

  if (path.startsWith('/img/https://')) {
    newPath = path.substring(5)
  }

  return (
    <Link to={`/onegood/${id}`}>
      <div className={st.item}>
        <img className={st.img} src={newPath} alt={name} />
        <h2 className={st.name}>{name}</h2>
        <p className="">{colors}</p>
        <div className={st.wrapper}>
          <p className={st.price}>
            {s.slice(0, s.length - 3) + ' ' + s.slice(-3)} ₽
          </p>
          <div className={st.counter}>
            <button className={st.btn} onClick={handleDecrease}>
              <span>-</span>
            </button>
            <span>{item.count}</span>
            <button
              className={st.btn}
              onClick={handleIncrease}
              style={{
                backgroundColor: isDisable ? 'rgba(0,0,0,.1)' : '',
                cursor: isDisable ? 'auto' : '',
              }}
            >
              <span>+</span>
            </button>
          </div>

          <FaTrashAlt
            className={st.deleteIcon}
            onClick={(e) => {
              e.preventDefault()
              deleteCart(item.id, colors)
            }}
          />
        </div>
      </div>
    </Link>
  )
}

export default Order
