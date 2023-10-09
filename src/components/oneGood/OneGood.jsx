import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { CustomContext } from '../../Context'
import ICONS from './../../assets/icons'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './../../style/style.scss'
import st from './OneGood.module.scss'

const OneGood = ({ list }) => {
  const params = useParams()
  const [good, setGood] = useState({})
  const [colorChoose, setColorChoose] = useState(null)

  const location = useLocation()
  
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
  const [quantityGoods, setQuantityGoods] = useState(0) //доступное количество товара
  const [isDisable, setIsDisable] = useState(false)

  useEffect(() => {
    axios(`http://localhost:3001/goods/${params.id}`)
      .then(({ data }) => {
        setGood(data)
        setImgChoose(data.colors[0].image)
        setColorChoose(data.colors[0].code)
        setColorName(data.colors[0].name)
        setQuantityGoods(data.colors[0].quantity)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [location])

  const chooseColor = (color) => {
    setColorName(color.name)
    setColorChoose(color.code)
    setImgChoose(color.image)
    setQuantityGoods(color.quantity)
    setIsDisable(false)
  }

  useEffect(() => {
    const filteredItems = list.filter(
      (item) => item.id !== good.id && item.category === category,
    )
  }, [list, good, category])

  var settings = {
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <>
      {/* Описание одного товара */}
      <section className={st.oneGood}>
        <div className="container">
          <div className={st.oneGood__wrapper}>
            <div className={st.oneGood__img}>
              <LazyLoadImage
                src={`${process.env.PUBLIC_URL}/img/${imgChoose}`}
                alt={name}
                effect="blur"
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
                      item.code === 'beige' ||
                      item.code === 'linen'
                        ? '0.5px solid #000'
                        : ''
                    return (
                      <li
                        key={item.code}
                        className={`${st.color} ${
                          item.code === colorChoose ? st.active : ''
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
                {quantityGoods ? (
                  <p>
                    В наличии: <span>{quantityGoods}</span> шт.
                  </p>
                ) : (
                  <p>Нет в наличии</p>
                )}
              </div>
              {quantityGoods ? (
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
                      quantity: quantityGoods,
                    })
                  }
                  style={{
                    backgroundColor: isDisable ? 'rgba(0,0,0,.2)' : '',
                    cursor: isDisable ? 'auto' : '',
                  }}
                >
                  {isDisable ? 'нет в наличии' : '  В корзину'}
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
            {list.length > 2 && (
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
                      (accumulator, color) => accumulator + color.quantity,
                      0,
                    )

                    return (
                      <Link
                        to={`/onegood/${item.id}`}
                        className={st.item}
                        key={item.id}
                      >
                        <LazyLoadImage
                          className={st.img}
                          src={`${process.env.PUBLIC_URL}/img/${firstColorImage}`}
                          alt={name}
                          effect="blur"
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
                            <div
                              className={st.add}
                              onClick={(e) => {
                                e.preventDefault()
                                AddCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  colors: item.colors[0].name,
                                  image: item.colors[0].image,
                                  count: count,
                                  category: item.category,
                                  quantity: item.colors[0].quantity,
                                })
                              }}
                            >
                              +
                            </div>
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
