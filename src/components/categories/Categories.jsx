import React, { useState } from 'react'
import st from './Categories.module.scss'

const Categories = ({ chooseCategory, selectedCategory }) => {
  const [categories, setCategoties] = useState([
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
      key: 'armchair',
      name: 'Кресло',
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
    {
      key: 'press',
      name: 'Шкаф',
    },
    {
      key: 'puff',
      name: 'Пуф',
    },
  ])

  return (
    <div className={st.categories}>
      {categories.map((el) => (
        <div
          key={el.key}
          onClick={() => {
            chooseCategory(el.key)
          }}
          className={`${st.elem} ${
            selectedCategory === el.key ? st.active : ''
          }`}
        >
          {el.name}
        </div>
      ))}
    </div>
  )
}

export default Categories
