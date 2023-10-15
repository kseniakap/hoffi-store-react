import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'
import ItemServices from '../../services/ItemServices'

import st from './AddNewGood.module.scss'
import './../../style/style.scss'

const AddNewGood = () => {
  const { register, handleSubmit, reset } = useForm()
  const [selectedColors, setSelectedColors] = useState([])
  const [colorImages, setColorImages] = useState({})
  const [colorQuantities, setColorQuantities] = useState({})
  const [newColor, setNewColor] = useState('')
  const [addColor, setAddColor] = useState(false)
  const [newColorCode, setNewColorCode] = useState('#fff')
  //добавление нового цвета
  const { getAllItems } = ItemServices()

  const colors = [
    'white',
    'burlywood',
    'goldenrod',
    'Gainsboro',
    'silver',
    'DarkGray',
    'dimgray',
    'black',
    // Add more colors as needed
  ]

  const navigate = useNavigate()

  const AddNewGood = (data) => {
    axios
      .post(`http://localhost:3001/goods`, {
        ...data,
        colors: selectedColors.map((color) => ({
          name: getColorName(color),
          code: color,
          image: colorImages[color],
          quantity: colorQuantities[color],
        })),
      })
      .then(() => {
        getAllItems()
        navigate('/goods')
      })
  }

  const getColorName = (colorCode) => {
    switch (colorCode) {
      case 'white':
        return 'белый'
      case 'Gainsboro':
        return 'светло-серый'
      case 'burlywood':
        return 'бежевый'
      case 'lightsteelblue':
        return 'светло-голубой'
      case 'goldenrod':
        return 'горчичный'
      case 'Silver':
        return 'Серебрянный'
      case 'DarkGray':
        return 'темно-серый'
      case 'dimgray':
        return 'темно-серый'
      case 'black':
        return 'черный'

      default:
        return 'Неизвестный цвет'
    }
  }

  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const handleImageUpload = (color, e) => {
    const file = e.target.files[0]
    setColorImages({ ...colorImages, [color]: file.name })
  }

  const handleQuantityChange = (color, e) => {
    const quantity = e.target.value
    setColorQuantities({ ...colorQuantities, [color]: quantity })
  }

  const addNewColor = () => {
    setAddColor(true)
    setSelectedColors([...selectedColors, newColorCode])
  }

  return (
    <section className={st.create}>
      <div className="container">
        <form className={st.form} onSubmit={handleSubmit(AddNewGood)}>
          <h1 className="title">Создание нового товара</h1>
          {/* название товара */}
          <div className={st.formSubtitle}>
            <label htmlFor="name">Название</label>
            <input {...register('name')} type="text" id="name" required />
          </div>
          {/* описание товара */}
          <div className={st.formSubtitle}>
            <label htmlFor="descr">Описание товара</label>
            <textarea {...register('description')} type="text" id="descr" />
          </div>
          {/* цена */}
          <div className={st.formSubtitle}>
            <label htmlFor="price">Цена</label>
            <input
              {...register('price')}
              type="text"
              id="price"
              style={{ width: '150px' }}
              required
            />
          </div>
          {/* категории */}
          <div className={st.formSubtitle}>
            <label>Категория</label>
            <select id="category" {...register('category')}>
              <option value="" defaultValue disabled hidden>
                Выберите категорию
              </option>
              <option value="table">Стол</option>
              <option value="chair">Стул</option>
              <option value="armchair">Кресло</option>
              <option value="sofa">Диван</option>
              <option value="sofa-bed">Диван-кровать</option>
              <option value="comod">Тумба</option>
              <option value="bed">Кровать</option>
              <option value="press">Шкаф</option>
              <option value="puff">Пуф</option>
            </select>
          </div>
          {/* цвета */}
          <div className={st.formSubtitle}>
            <label>Цвета</label>
            <ul className={st.colorWrapper}>
              {colors.map((color) => (
                <li
                  onClick={() => handleColorSelect(color)}
                  key={color}
                  style={{
                    backgroundColor: color,
                    border: '1px solid black',
                    cursor: 'pointer',
                  }}
                  className={`${st.color} ${
                    selectedColors.includes(color) ? st.activeColor : ''
                  }`}
                ></li>
              ))}
            </ul>
          </div>

          {/* Добавление нового цвета */}
          {/* <div className={st.addNewColorWrapper}>
            <div className={st.addNewColor} type="button" onClick={addNewColor}>
              Добавить цвет
            </div>
            {addColor ? (
              <>
                <input
                  type="color"
                  value={newColorCode}
                  onChange={(e) => setNewColorCode(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Введите название нового цвета"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                />
              </>
            ) : null}
          </div> */}

          {/* Поля для загрузки картинок и указания количества */}

          {selectedColors.map((color) => (
            <div key={color}>
              <label htmlFor={`image-${color}`} className={st.colorsCont}>
                <p> Изображение для цвета</p>
                <p
                  className={st.chooseColor}
                  style={{ backgroundColor: color, border: '1px solid #000' }}
                ></p>
              </label>
              <input
                type="file"
                id={`image-${color}`}
                onChange={(e) => handleImageUpload(color, e)}
              />
              <label
                style={{ marginRight: '10px' }}
                htmlFor={`quantity-${color}`}
              >
                Количество товара:
              </label>
              <input
                type="number"
                id={`quantity-${color}`}
                onChange={(e) => handleQuantityChange(color, e)}
              />
              <p>x</p>
            </div>
          ))}
          <button className={st.btnCreateNew} type="submit">
            Создать
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddNewGood
