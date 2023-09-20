import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'
import './../../style/style.scss'
import st from './OneGood.module.scss'

const OneGood = ({ addToOrder, list }) => {
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
        setColorName(data.colors[0].name)
        console.log(id)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  const { name, description, price, category, newPrice, colors } = good

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
          <h2 className={st.otherGood__title}>Похожие товары</h2>
          <div className={st.otherGood__container}>
            {list
              .filter((item) => item.id !== id && item.category === category)
              .map((item) => {
                const { name, description, price, newPrice, colors } = item
                const firstColorImage =
                  colors && colors.length > 0 ? colors[0].image : null
                return (
                  <Link
                    to={`/onegood/${item.id}`}
                    className={st.item}
                    key={item.id}
                  >
                    <img
                      className={st.img}
                      src={`${process.env.PUBLIC_URL}/img/${firstColorImage}`}
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
                      <div className={st.add} onClick={handleAddToOrder}>
                        +
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}

export default OneGood
