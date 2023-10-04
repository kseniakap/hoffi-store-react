import React from 'react'
import { useTranslation } from 'react-i18next'
import st from './Opinion.module.scss'
import OpinionItem from '../opinionItem/OpinionItem'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import IMAGES from '../../assets/img'

const Opinions = () => {
  const { t } = useTranslation()
  const reviews = [
    {
      img: IMAGES.opinionPerson_1,
      name: t('homePage.opinionSection.personOne.name'),
      city: t('homePage.opinionSection.personOne.city'),
      text: t('homePage.opinionSection.personOne.review'),
    },
    {
      img: IMAGES.opinionPerson_2,
      name: t('homePage.opinionSection.personTwo.name'),
      city: t('homePage.opinionSection.personTwo.city'),
      text: t('homePage.opinionSection.personTwo.review'),
    },
    {
      img: IMAGES.opinionPerson_3,
      name: t('homePage.opinionSection.personThree.name'),
      city: t('homePage.opinionSection.personThree.city'),
      text: t('homePage.opinionSection.personThree.review'),
    },
  ]
  return (
    <section>
      <div className="container">
        <div className={st.wrapper}>
          <div className={`title ${st.title}`}>
            {t('homePage.opinionSection.title')}
          </div>
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
