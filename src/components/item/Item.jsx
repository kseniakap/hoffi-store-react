import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import st from './Item.module.scss'

const Item = ({ list }) => {
  const { formatPrice, AddCart } = useContext(CustomContext)
  const { t } = useTranslation()
  const { id, name, description, price, newPrice, colors, category } = list

  const firstImg = colors && colors[0].image
  const path = `${process.env.PUBLIC_URL}/img/${firstImg}`
  let newPath = path

  if (path.startsWith('/img/https://')) {
    newPath = path.substring(5)
  }

  const totalCount = colors.reduce(
    (accumulator, color) => accumulator + color.quantity,
    0,
  )

  return (
    <>
      <div className={st.item}>
        {newPath && (
          <Link to={`/onegood/${id}`}>
            <LazyLoadImage
              className={st.img}
              src={newPath}
              alt={name}
              effect="blur"
            />
          </Link>
        )}
        <div className={st.content}>
          <Link to={`/onegood/${id}`}>
            <h2 className={st.name}>{name}</h2>
          </Link>
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
          {totalCount && colors[0].quantity ? (
            <div
              className={st.add}
              onClick={(e) => {
                e.preventDefault()
                AddCart({
                  id: id,
                  name: name,
                  price: price,
                  colors: colors[0]?.name,
                  image: colors[0]?.image,
                  count: 1,
                  category: category,
                  quantity: colors[0]?.quantity,
                })
              }}
            >
              +
            </div>
          ) : (
            <p className={st.instock}>{t('goodsPage.outOfStock')}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Item
