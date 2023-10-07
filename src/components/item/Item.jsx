import React, { useContext, useRef } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import st from './Item.module.scss'

const Item = ({ list }) => {
  const { id, name, description, price, newPrice, colors } = list

  const firstImg = colors && colors[0].image
  const { formatPrice } = useContext(CustomContext)

  const { t } = useTranslation()

  const totalCount = colors.reduce(
    (accumulator, color) => accumulator + color.quantity,
    0,
  )
  //общее доступное количество товара
  return (
    <>
      <Link to={`/onegood/${id}`} className={st.item}>
        <LazyLoadImage
          className={st.img}
          src={`${process.env.PUBLIC_URL}/img/${firstImg}`}
          alt={name}
          effect="blur"
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
          {totalCount ? (
            ''
          ) : (
            <p className={st.instock}>{t('goodsPage.outOfStock')}</p>
          )}
        </div>
      </Link>
    </>
  )
}

export default Item
