import React from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import st from './Featured.module.scss'

const Featured = () => {
  return (
    <div className={st.feature}>
      <div className={st.top}>
        <h3>Общий доход</h3>
        <FaEllipsisV />
      </div>
      <div className={st.bottom}>
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar value={45}  text={'45%'} strokeWidth={3}/>
        </div>
        <p className={st.title}>Общий объем продаж за сегодня</p>
        <p className={st.count}> 34554 ₽</p>
        <div className={st.summ}>
          <div className={st.item}></div>
        </div>
      </div>
    </div>
  )
}

export default Featured
