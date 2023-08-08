import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import st from './Order.module.scss'

const Order = ({ item, deleteOrder, order, setOrder }) => {
  const { name, price, image } = item

  const handleIncrease = () => {
    const updatedOrder = [...order]
    const index = updatedOrder.findIndex((el) => el.id === item.id)
    updatedOrder[index].count += 1
    setOrder(updatedOrder)
  }

  const handleDecrease = () => {
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
    <div className={st.item}>
      <img className={st.img} src={'./img/' + image} alt={name} />
      <h2 className={st.name}>{name}</h2>
      <div className={st.wrapper}>
        <p className={st.price}>{price} ₽ </p>
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
          onClick={() => deleteOrder(item.id)}
        />
      </div>
    </div>
  )
}

export default Order
