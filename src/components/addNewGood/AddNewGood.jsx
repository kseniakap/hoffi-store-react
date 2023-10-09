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

  const { getAllItems } = ItemServices()

  const navigate = useNavigate()

  const AddcNewGood = (data) => {
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
      case 'lightgray':
        return 'светло-серый'
      case 'burlywood':
        return 'бежевый'
      case 'lightsteelblue':
        return 'светло-голубой'
      case 'goldenrod':
        return 'горчичный'
      case 'SkyBlue':
        return 'серо-голубой'
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

  return (
    <section className={st.create}>
      <div className="container">
        <form className={st.form} onSubmit={handleSubmit(AddcNewGood)}>
          <div className={st.formSubtitle}>
            <label htmlFor="name">Название</label>
            <input {...register('name')} type="text" id="name" />
          </div>
          <div className={st.formSubtitle}>
            <label htmlFor="descr">Описание товара</label>
            <input {...register('description')} type="text" id="descr" />
          </div>
          <div className={st.formSubtitle}>
            <label htmlFor="price">Цена</label>
            <input {...register('price')} type="text" id="price" />
          </div>
          <div className={st.formSubtitle}>
            <p>Категория</p>
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
          <div className={st.formSubtitle}>
            <p>Цвета</p>
            <ul className={st.colorWrapper}>
              {renderColorOption('white', selectedColors, handleColorSelect)}
              {renderColorOption(
                'lightgray',
                selectedColors,
                handleColorSelect,
              )}
              {renderColorOption(
                'burlywood',
                selectedColors,
                handleColorSelect,
              )}
              {renderColorOption(
                'lightsteelblue',
                selectedColors,
                handleColorSelect,
              )}
              {renderColorOption(
                'goldenrod',
                selectedColors,
                handleColorSelect,
              )}
              {renderColorOption('SkyBlue', selectedColors, handleColorSelect)}
              {renderColorOption('dimgray', selectedColors, handleColorSelect)}
              {renderColorOption('black', selectedColors, handleColorSelect)}
            </ul>
          </div>

          {/* Поля для загрузки картинок и указания количества */}

          {selectedColors.map((color) => (
            <div key={color}>
              <label htmlFor={`image-${color}`} className={st.colorsCont}>
                <p> Изображение для цвета</p>
                <p
                  className={st.chooseColor}
                  style={{ backgroundColor: color }}
                ></p>
              </label>
              <input
                type="file"
                id={`image-${color}`}
                onChange={(e) => handleImageUpload(color, e)}
              />
              <label htmlFor={`quantity-${color}`}>Количество товара:</label>
              <input
                type="number"
                id={`quantity-${color}`}
                onChange={(e) => handleQuantityChange(color, e)}
              />
            </div>
          ))}
          <button type="submit">Создать</button>
        </form>
      </div>
    </section>
  )
}

const renderColorOption = (
  backgroundColor,
  selectedColors,
  handleColorSelect,
) => {
  const isSelected = selectedColors.includes(backgroundColor)
  return (
    <li
      onClick={() => handleColorSelect(backgroundColor)}
      key={backgroundColor}
      style={{
        backgroundColor: backgroundColor,
        border: '1px solid black',
        cursor: 'pointer',
      }}
      className={`${st.color} ${isSelected ? st.activeColor : ''}`}
    >
      <p>name</p>
    </li>
  )
}

export default AddNewGood
