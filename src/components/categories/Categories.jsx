import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import st from './Categories.module.scss'

const Categories = ({ chooseCategory, selectedCategory, setPage }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [categories, setCategoties] = useState([
    {
      key: 'all',
      name: t('goodsPage.categories.oneCategory'),
    },
    {
      key: 'table',
      name: t('goodsPage.categories.twoCategory'),
    },
    {
      key: 'chair',
      name: t('goodsPage.categories.threeCategory'),
    },
    {
      key: 'armchair',
      name: t('goodsPage.categories.fourCategory'),
    },
    {
      key: 'sofa',
      name: t('goodsPage.categories.fiveCategory'),
    },
    {
      key: 'sofa-bed',
      name: t('goodsPage.categories.sixCategory'),
    },
    {
      key: 'comod',
      name: t('goodsPage.categories.sevenCategory'),
    },
    {
      key: 'bed',
      name: t('goodsPage.categories.eightCategory'),
    },
    {
      key: 'press',
      name: t('goodsPage.categories.nineCategory'),
    },
    {
      key: 'puff',
      name: t('goodsPage.categories.tenCategory'),
    },
  ])

  const category = useRef(null)

  const closeOpenMenus = (e) => {
    if (category.current && open && !category.current.contains(e.target)) {
      setOpen(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)

  return (
    <div className={st.categories} ref={category}>
      <div className={st.filter} onClick={() => setOpen(!open)}>
        По категориям
      </div>
      {open &&
        categories.map((el) => (
          <div
            key={el.key}
            onClick={() => {
              chooseCategory(el.key)
              setPage(1)
              setTimeout(() => {
                setOpen(false)
              }, 500)
            }}
            className={`${st.elemNone} ${
              selectedCategory === el.key ? st.active : ''
            }`}
          >
            {el.name}
          </div>
        ))}
      {categories.map((el) => (
        <div
          key={el.key}
          onClick={() => {
            chooseCategory(el.key)
            setPage(1)
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
