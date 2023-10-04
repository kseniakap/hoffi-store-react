import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import st from './OpinionItem.module.scss'

const OpinionItem = ({ img, name, city, text }) => {
  return (
    <div className={st.item}>
      <div className={st.top}>
        <LazyLoadImage
          src={img}
          alt={name}
          className={st.thumbnail}
          effect="blur"
        />
        <div>
          <div className={st.name}>{name}</div>
          <div className={st.sity}>{city}</div>
        </div>
      </div>
      <div className={st.descr}>{text}</div>
    </div>
  )
}

export default OpinionItem
