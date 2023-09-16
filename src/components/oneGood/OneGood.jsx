import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CustomContext } from '../../Context'
import './../../style/style.scss'
import st from './OneGood.module.scss'

const OneGood = ({ addToOrder }) => {
  const params = useParams()
  const [good, setGood] = useState({})
  const [colorChoose, setColorChoose] = useState(null)

  const {
    formatPrice,
    setCardOpen,
    imgChoose,
    setImgChoose,
    colorName,
    setColorName,
  } = useContext(CustomContext)
  const { id } = useParams()

  useEffect(() => {
    axios(`http://localhost:3001/goods/${params.id}`)
      .then(({ data }) => {
        setGood(data)
        setImgChoose(data.colors[0].image)
        console.log()
        setColorName(data.colors[0].name)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  const { name, description, price, newPrice, colors } = good

  const chooseColor = (color) => {
    setColorName(color.name)
    setColorChoose(color.code)
    setImgChoose(color.image)
  }

  const handleAddToOrder = (event) => {
    event.preventDefault()
    addToOrder(good)
    setCardOpen(true)
  }

  return (
    <>
      <section className={st.oneGood}>
        <div className="container">
          <div className={st.oneGood__wrapper}>
            <div className={st.oneGood__img}>
              <img
                src={`${process.env.PUBLIC_URL}/img/${imgChoose}`}
                alt={name}
              />
            </div>
            <div className={st.oneGood__info}>
              <h2>{name}</h2>
              <div className={st.oneGood__descr}>
                {description ? description : ''}
              </div>
              <div className={st.oneGood__price}>
                {newPrice ? (
                  <>
                    <div style={{ textDecoration: 'line-through' }}>
                      {formatPrice(price)} <span> ₽</span>
                    </div>
                    <span> / </span>
                    <div>
                      {formatPrice(newPrice)} <span> ₽</span>
                    </div>
                  </>
                ) : (
                  <div>
                    {formatPrice(price)} <span> ₽</span>
                  </div>
                )}
              </div>
              {colors && colors.length && (
                <p className={st.chooseColors}>Выбранный цвет: {colorName} </p>
              )}

              <ul className={st.colors}>
                {colors &&
                  colors.map((item) => {
                    const borderColor =
                      item.code === 'white' ||
                      item.code === 'ivory' ||
                      item.code === 'beige'
                        ? '0.5px solid #000'
                        : ''
                    return (
                      <li
                        key={item.code}
                        className={`${st.color} ${
                          item === colorChoose ? st.active : ''
                        }`}
                        onClick={() => chooseColor(item)}
                        style={{
                          backgroundColor: item.code,
                          border: borderColor,
                        }}
                      ></li>
                    )
                  })}
              </ul>

              <button onClick={handleAddToOrder}>В корзину</button>
            </div>
          </div>
        </div>
      </section>
      <section className={st.otherGood}>
        <div className="container">
        <h2>Связанные товары</h2>
        <div className={st.otherGood__wrapper}></div>
        </div>
      </section>
    </>
  )
}

export default OneGood
