import React from 'react'
import st from './Opinion.module.scss'
import OpinionItem from '../opinionItem/OpinionItem'
import IMAGES from '../../assets/img'

const reviews = [
  {
    img: IMAGES.opinionPerson_1,
    name: 'Наталья Иванова ',
    city: 'Москва',
    text:
      ' Хороший магазин с большим выбором товаров для дома и дачи. Качество соответствует цене',
  },
  {
    img: IMAGES.opinionPerson_2,
    name: 'Максим Герасим ',
    city: 'Иваново',
    text:
      'Огромный выбор! Мебель, кухни, товары для дома. Всякие мелочи,необходимые для жизни здесь можно купить',
  },
  {
    img: IMAGES.opinionPerson_3,
    name: 'Анна Черненко ',
    city: 'Санкт-Петербург',
    text:
      'Удобная навигация в магазине, обслуживание на высшем уровне, продавцы всегда помогут с выбором и подскажут, где какой товар находится',
  },
]
const Opinions = () => {
  return (
    <section>
      <div className="container">
        <div className={st.wrapper}>
          <div className={`title ${st.title}`}>Что люди думают о нас</div>
          <div className={st.items}>
            {reviews.map((item, i) => {
              return <OpinionItem key={i} {...item} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Opinions
