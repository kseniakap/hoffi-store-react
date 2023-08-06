import React from 'react'

const Order = ({ item }) => {
  const { name, price, image } = item
  
  return (
    <div className="item">
      <img className="" src={'./img/' + image} alt={name} />
      <div className="">
        <h2 className="">{name}</h2>
        <p className="">{price} ₽ </p>
      </div>
    </div>
  )
}

export default Order
