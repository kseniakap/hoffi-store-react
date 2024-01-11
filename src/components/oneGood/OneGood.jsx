import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CustomContext } from '../../Context'
import Carousel from 'react-multi-carousel'

import ItemServices from '../../services/ItemServices'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useTranslation } from 'react-i18next'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-multi-carousel/lib/styles.css'
import './../../style/style.scss'
import st from './OneGood.module.scss'

const OneGood = ({ list }) => {
  const { register, handleSubmit } = useForm()
  const params = useParams()

  const [good, setGood] = useState({})
  const [colorChoose, setColorChoose] = useState(null)
  const { getAllItems } = ItemServices()
  const [count, setCount] = useState(1)
  const [quantityGoods, setQuantityGoods] = useState(0) //доступное количество товара

  const [isDisable, setIsDisable] = useState(false)
  const [changeInfo, setChangeInfo] = useState(false)

  const {
    AddCart,
    formatPrice,
    imgChoose,
    setImgChoose,
    colorName,
    setColorName,
    user,
    setCardOpen,
    BASE_URL
  } = useContext(CustomContext)
  const { t } = useTranslation()
  const { name, description, price, newPrice, colors } = good

  useEffect(() => {
    axios(`${BASE_URL}/goods/${params.id}`)
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
  }, [])

  const chooseColor = (color) => {
    setColorName(color.name)
    setColorChoose(color.code)
    setImgChoose(color.image)
    setQuantityGoods(color.quantity)
    setIsDisable(false)
  }

  const changeData = (data) => {
    axios
      .patch(`${BASE_URL}/goods/${good.id}`, {
        name: data.name,
        description: data.description,
        newPrice: data.newPrice,
      })
      .then(({ data }) => {
        setGood({
          ...good,
          name: data.name,
          description: data.description,
          newPrice: data.newPrice,
        })
        setChangeInfo(false)
        getAllItems()
      })
      .catch((error) => {
        console.error('Возникла ошибка при изменении товара:', error)
      })
  }
  const path = `${process.env.PUBLIC_URL}/img/${imgChoose}`
  let newPath = path

  if (path.startsWith('/img/https://')) {
    newPath = path.substring(5)
  }

  return (
    <>
      {/* Описание одного товара */}
      <section className={st.oneGood}>
        <div className="container">
          <div className={st.oneGood__wrapper}>
            <LazyLoadImage
              src={newPath}
              alt={name}
              effect="blur"
              className={st.oneGood__img}
            />

            <form
              className={st.oneGood__info}
              onSubmit={handleSubmit(changeData)}
            >
              {/* Изменение названия товара */}
              {changeInfo ? (
                <>
                  <label htmlFor="name">{t('OneGoodPage.name')}</label>
                  <input
                    {...register('name')}
                    type="text"
                    defaultValue={name}
                    placeholder={t('OneGoodPage.placeholderName')}
                    id="name"
                  />
                </>
              ) : (
                <h2>{name}</h2>
              )}
              {/* Описание товара */}
              {changeInfo ? (
                <>
                  <label htmlFor="descr">{t('OneGoodPage.descr')}</label>
                  <textarea
                    {...register('description')}
                    type="text"
                    defaultValue={description}
                    placeholder={t('OneGoodPage.placeholderDescr')}
                    id="descr"
                  />
                </>
              ) : (
                <div className={st.oneGood__descr}>
                  {description ? description : ''}
                </div>
              )}
              {/* Цена товара */}
              {changeInfo ? (
                <>
                  {newPrice ? (
                    <>
                      <label htmlFor="price">{t('OneGoodPage.oldPrice')}</label>
                      <input defaultValue={price} disabled id="price" />
                    </>
                  ) : null}
                  <label htmlFor="newPrice">{t('OneGoodPage.newPrice')}</label>
                  <input
                    {...register('newPrice')}
                    type="number"
                    defaultValue={price}
                    placeholder={t('OneGoodPage.placeholderPrice')}
                    id="newPrice"
                  />
                </>
              ) : (
                <div className={st.oneGood__price}>
                  {newPrice ? (
                    <>
                      {newPrice > price ? (
                        <div>
                          {formatPrice(newPrice)} <span> ₽</span>
                        </div>
                      ) : (
                        <>
                          <div style={{ textDecoration: 'line-through' }}>
                            {formatPrice(price)} <span> ₽</span>
                          </div>
                          <span> / </span>
                          <div>
                            {formatPrice(newPrice)} <span> ₽</span>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div>
                      {formatPrice(price)} <span> ₽</span>
                    </div>
                  )}
                </div>
              )}
              {changeInfo
                ? null
                : colors &&
                  colors.length > 0 && (
                    <p className={st.chooseColors}>
                      Выбранный цвет: {colorName}{' '}
                    </p>
                  )}

              {changeInfo ? null : (
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
                            item.code === colorChoose && item.code === 'black'
                              ? st.activeBlackWhite
                              : item.code === colorChoose
                              ? st.activeBlack
                              : ''
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
              )}
              {changeInfo ? null : (
                <div className={st.count}>
                  {quantityGoods ? (
                    <p>
                      В наличии: <span>{quantityGoods}</span> шт.
                    </p>
                  ) : (
                    <p>Нет в наличии</p>
                  )}
                </div>
              )}
              <div className={st.btns}>
                {changeInfo ? null : quantityGoods ? (
                  <button
                    onClick={() => {
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
                      setCardOpen(true)
                    }}
                    style={{
                      backgroundColor: isDisable ? 'rgba(0,0,0,.2)' : '',
                      cursor: isDisable ? 'auto' : '',
                    }}
                  >
                    {isDisable
                      ? 'нет в наличии'
                      : `${t('OneGoodPage.inBasket')}`}
                  </button>
                ) : (
                  ''
                )}
                {user.email === 'admin@gmail.com' ? (
                  <>
                    <button
                      className={st.btnChange}
                      type="submit"
                      onClick={() => setChangeInfo(true)}
                      style={{
                        display: changeInfo ? 'block' : 'none',
                        marginTop: '10px',
                      }}
                    >
                      {t('OneGoodPage.save')}
                    </button>

                    <div
                      className={st.btnChange}
                      onClick={() => setChangeInfo(true)}
                      style={{ display: changeInfo ? 'none' : 'block' }}
                    >
                      {t('OneGoodPage.change')}
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Похожие товары */}
      <SimilarProducts list={list} good={good} count={count} />
    </>
  )
}

export default OneGood

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 992, min: 576 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
}

const SimilarProducts = ({ good, count }) => {
  const { formatPrice, AddCart } = useContext(CustomContext)
  const { category } = good
  const [newItemLoading, setNewItemLoading] = useState(false)
  const { getAllItems } = ItemServices()
  const [allGoods, setAllGoods] = useState([])

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllItems().then(onListItemLoaded)
  }

  const onListItemLoaded = (newcharList) => {
    setAllGoods(newcharList)
    setNewItemLoading(false)
  }

  const renderItems = (arr) => {
    return arr
      .filter((item) => item.id !== good.id && item.category === category)
      .map((item) => {
        const { name, description, price, newPrice, colors } = item
        const firstColorImage =
          colors && colors.length > 0 ? colors[0].image : null
        const descr = description
          ? `${item.description.slice(0, 130)}...`
          : 'В данный момент описание о данном товаре отсутствует'
        const path = `${process.env.PUBLIC_URL}/img/${firstColorImage}`
        let newPath = path

        if (path.startsWith('/img/https://')) {
          newPath = path.substring(5)
        }

        const totalCount = colors.reduce(
          (accumulator, color) => accumulator + color.quantity,
          0,
        )

        return (
          <Link to={`/onegood/${item.id}`} className={st.item} key={item.id}>
            <LazyLoadImage
              className={st.img}
              src={newPath}
              alt={name}
              effect="blur"
            />
            <div className={st.content}>
              <h2 className={st.name}>{name}</h2>
              <p className={st.descr}>{descr}</p>
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
      })
  }

  const additionalGoods = renderItems(allGoods)

  return (
    <>
      <section className={st.otherGood}>
        <div className="container">
          <h2 className={st.otherGood__title}>Похожие товары</h2>
          <div className={st.otherGood__container}>
            <Carousel key={`allSaleCarousel`} responsive={responsive}>
              {additionalGoods}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  )
}
