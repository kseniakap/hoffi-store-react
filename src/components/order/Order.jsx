import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import st from './Order.module.scss'

const Order = ({ item, deleteOrder }) => {
  const { name, price, image } = item

  return (
    <div className={st.item}>
      <img className={st.img} src={'./img/' + image} alt={name} />
      <h2 className={st.name}>{name}</h2>
      <div className={st.wrapper}>
        <p className="">{price} ₽ </p>
        <FaTrashAlt
          className={st.deleteIcon}
          onClick={() => deleteOrder(item.id)}
        />
      </div>
    </div>
  )
}

export default Order
