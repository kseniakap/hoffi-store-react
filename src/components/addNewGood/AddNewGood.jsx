import React from 'react'
import WrappperCreateNewGood from './WrapperCreateNewGood'
import st from './AddNewGood.module.scss'
import './../../style/style.scss'


const AddNewGood = () => {
  return (
    <section className={st.create}>
      <div className="container">
        <WrappperCreateNewGood/>
      </div>
    </section>
  )
}

export default AddNewGood

