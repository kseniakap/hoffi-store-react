import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import st from './Order.module.scss'

const Order = ({ item, deleteOrder, order, setOrder }) => {
  const { imgChoose, colorName } = useContext(CustomContext)

  const { id, name, price, colors, category} = item
  const s = String(price)

  const handleIncrease = (e) => {
    e.preventDefault()
    const updatedOrder = [...order]
    const index = updatedOrder.findIndex((el) => el.id === item.id)
    updatedOrder[index].count += 1
    setOrder(updatedOrder)
  }

  const handleDecrease = (e) => {
    e.preventDefault()
    const updatedOrder = [...order]
    const index = updatedOrder.findIndex((el) => el.id === item.id)
    if (updatedOrder[index].count === 1) {
      deleteOrder(item.id)
    } else {
      updatedOrder[index].count -= 1
      setOrder(updatedOrder)
    }
  }

  return (
    <Link to={`/onegood/${id}`}>
      <div className={st.item}>
        <img
          className={st.img}
          src={`${process.env.PUBLIC_URL}/img/${colors[0].image}`}
          alt={name}
        />
        <h2 className={st.name}>{name}</h2>
        <p className="">{colorName}</p>
        <div className={st.wrapper}>
          <p className={st.price}>
            {s.slice(0, s.length - 3) + ' ' + s.slice(-3)} ₽
          </p>
          <div className={st.counter}>
            <button className={st.btn} onClick={handleDecrease}>
              <span>-</span>
            </button>
            <span>{item.count}</span>
            <button className={st.btn} onClick={handleIncrease}>
              <span>+</span>
            </button>
          </div>
          <FaTrashAlt
            className={st.deleteIcon}
            onClick={(e) => {
              e.preventDefault()
              deleteOrder(item.id)
            }}
          />
        </div>
      </div>
    </Link>
  )
}

export default Order
