import React from 'react'

import st from './Item.module.scss'

const Item = ({ list, addToOrder }) => {
  const { name, description, price, newPrice, image } = list
  const pr = list.price.toString()
  // const NewPr = list && list.newPrice!=="undefined" && list.newPrice.toString();
  // console.log(NewPr)

  return (
    <>
      <div className={st.item}>
        <img className={st.img} src={'./img/' + image} alt={name} />
        <div className={st.content}>
          <h2 className={st.name}>{name}</h2>
          <p className={st.descr}>{description}</p>
          <p className={st.price}>
            {pr.length > 3 ? pr.slice(0, -3) + ' ' + pr.slice(-3) : price} ₽
          </p>
          {/* <p className={st.price}>
            $(newPrice)?
            <>
              <span style={{ textDecoration: 'line-through' }}>
                {pr.length > 3 ? pr.slice(0, -3) + ' ' + pr.slice(-3) : price} ₽
              </span>
              /
              <span>
                {NewPr.length > 3
                  ? NewPr.slice(0, -3) + ' ' + NewPr.slice(-3)
                  : newPrice}{' '}
                ₽
              </span>
            </>{' '}
            :{pr.length > 3 ? pr.slice(0, -3) + ' ' + pr.slice(-3) : price} ₽
          </p> */}
          <div className={st.add} onClick={() => addToOrder(list)}>
            +
          </div>
        </div>
      </div>
    </>
  )
}

export default Item
