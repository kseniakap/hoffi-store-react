import React from 'react'
import st from './OpinionItem.module.scss'


const OpinionItem = ({img, name, city, text}) => {
  return (
    <div className={st.item}>
      <div className={st.top}>
        <img src={img} alt={name} className={st.thumbnail} />
        <div>
          <div className={st.name}>{name}</div>
          <div className={st.sity}>{city}</div>
        </div>
      </div>
      <div className={st.descr}>
        {text}
      </div>
    </div>
  )
}

export default OpinionItem
