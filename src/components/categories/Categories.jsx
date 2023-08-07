import React, { useState } from 'react';
import st from "./Categories.module.scss"

const Categories = ({chooseCategory}) => {
  const [categories, setState] = useState([
    {
      key: 'all',
      name: 'Всё',
    },
    {
      key: 'table',
      name: 'Стол',
    },
    {
      key: 'chair',
      name: 'Стул',
    },
    {
      key: 'sofa',
      name: 'Диван',
    },
    {
      key: 'sofa-bed',
      name: 'Диван-кровать',
    },
    {
      key: 'comod',
      name: 'Тумба',
    },
    {
      key: 'bed',
      name: 'Кровать',
    },
  ])

  return (
    <div className={st.categories}>
      {categories.map((el) => (
        <div key={el.key} onClick={()=>chooseCategory(el.key)} className={st.elem}>
          {el.name}
        </div>
      ))}
    </div>
  )
}

export default Categories
