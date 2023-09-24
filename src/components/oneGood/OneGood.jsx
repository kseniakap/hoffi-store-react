import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CustomContext } from '../../Context'
import ICONS from './../../assets/icons'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import './../../style/style.scss'
import st from './OneGood.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OneGood = ({
  list,
}) => {
  const params = useParams()
  const [good, setGood] = useState({})
  const [colorChoose, setColorChoose] = useState(null)

  const {
    AddCart,
    formatPrice,
    imgChoose,
    setImgChoose,
    colorName,
    setColorName,
  } = useContext(CustomContext)

  const { name, description, price, category, newPrice, colors } = good
  const [count, setCount] = useState(1)
  const [countGoods, setCountGoods] = useState(0) //доступное количество товара

  useEffect(() => {
    axios(`http://localhost:3001/goods/${params.id}`)
      .then(({ data }) => {
        setGood(data)
        setImgChoose(data.colors[0].image)
        setColorName(data.colors[0].name)
        setCountGoods(data.colors[0].count)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [params])

  const chooseColor = (color) => {
    setColorName(color.name)
    setColorChoose(color.code)
    setImgChoose(color.image)
    setCountGoods(color.count)
  }

  var settings = {
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // variableWidth: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
  }

  return (
    <>
      {/* Описание одного товара */}
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
              <div className={st.count}>
                {countGoods ? (
                  <p>
                    В наличии: <span>{countGoods}</span> шт.
                  </p>
                ) : (
                  <p>Нет в наличии</p>
                )}
              </div>
              {countGoods ? (
                <button
                  onClick={() =>
                    AddCart({
                      id: good.id,
                      name: good.name,
                      price: good.newPrice || good.price,
                      colors: colorName,
                      image: imgChoose,
                      count: count,
                      category: good.category,
                    })
                  }
                >
                  В корзину
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Похожие товары */}
      <section className={st.otherGood}>
        <div className="container">
          <h2 className={st.otherGood__title}>Похожие товары</h2>
          <div className={st.otherGood__container}>
            {list.length > 0 && (
              <Slider {...settings}>
                {list
                  .filter(
                    (item) => item.id !== good.id && item.category === category,
                  )
                  .map((item) => {
                    const { name, description, price, newPrice, colors } = item
                    const firstColorImage =
                      colors && colors.length > 0 ? colors[0].image : null
                    const totalCount = colors.reduce(
                      (accumulator, color) => accumulator + color.count,
                      0,
                    )

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
                                <span
                                  style={{ textDecoration: 'line-through' }}
                                >
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
                            <div className={st.add}>+</div>
                          ) : (
                            <p className={st.instock}>Нет в наличии</p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
              </Slider>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default OneGood

const CustomPrevArrow = ({ onClick }) => (
  <button className={st.nextArrow} onClick={onClick}>
    <img src={ICONS.iconArrowLeft} alt="arrow" />
  </button>
)

const CustomNextArrow = ({ onClick }) => (
  <button className={st.prevArrow} onClick={onClick}>
    <img src={ICONS.iconArrow} alt="arrow" />
  </button>
)
