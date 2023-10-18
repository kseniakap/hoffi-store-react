import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'
import ItemServices from '../../services/ItemServices'

import { imgDB } from './../../fireBase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import st from './AddNewGood.module.scss'
import './../../style/style.scss'

const colors = [
  'white',
  'cornsilk',
  'burlywood',
  'goldenrod',
  'gainsboro',
  'silver',
  'darkGray',
  'dimgray',
  'black',
]
const redColors = [
  'DarkSalmon',
  'LightSalmon',
  'Salmon',
  'LightCoral',
  'IndianRed',
  'Crimson',
  'Red',
  'FireBrick',
]
const pinkColors = [
  'Pink',
  'LightPink',
  'HotPink',
  'DeepPink',
  'MediumVioletRed',
  'PaleVioletRed',
]
const orangeColors = ['Coral', 'Tomato', 'OrangeRed', 'DarkOrange', 'Orange']
const yellowColors = [
  'LightYellow',
  'LemonChiffon',
  'PapayaWhip',
  'Moccasin',
  'PeachPuff',
  'PaleGoldenrod',
  'Khaki',
  'DarkKhaki',
]
const purpleColors = [
  'Lavender',
  'Thistle',
  'Plum',
  'Violet',
  'Orchid',
  'Fuchsia',
  'MediumPurple',
  'BlueViolet',
  'Indigo',
]
const brownColors = [
  'NavajoWhite',
  'SandyBrown',
  'Goldenrod',
  'DarkGoldenRod',
  'Chocolate',
  'Sienna',
  'Brown',
  'Maroon',
]
const greenColors = [
  'PaleGreen',
  'GreenYellow',
  'LawnGreen',
  'Lime',
  'LimeGreen',
  'MediumSpringGreen',
  'MediumSeaGreen',
  'SeaGreen',
  'Green',
]
const blueColors = [
  'LightCyan',
  'PaleTurquoise',
  'Turquoise',
  'Aqua',
  'SkyBlue',
  'DeepSkyBlue',
  'DodgerBlue',
  'Blue',
  'DarkBlue',
]

const getColorName = (colorCode) => {
  switch (colorCode) {
    case 'white':
      return 'белый'
    case 'gainsboro':
      return 'светло-серый'
    case 'burlywood':
      return 'бежевый'
    case 'cornsilk':
      return 'светло-бежевый'
    case 'lightsteelblue':
      return 'светло-голубой'
    case 'goldenrod':
      return 'горчичный'
    case 'silver':
      return 'Серебрянный'
    case 'darkGray':
      return 'темно-серый'
    case 'dimgray':
      return 'темно-серый'
    case 'black':
      return 'черный'
    case 'IndianRed':
      return 'индийский красный'
    case 'LightCoral':
      return 'светло-каралловый'
    case 'Salmon':
      return 'лососевый'
    case 'DarkSalmon':
      return 'светло-лососевый'
    case 'LightSalmon':
      return 'темно-лососевый'
    case 'Crimson':
      return 'малиновый'
    case 'Red':
      return 'красный'
    case 'FireBrick':
      return 'темно-красный'
    case 'Pink':
      return 'розовый'
    case 'LightPink':
      return 'светло-розовый'
    case 'HotPink':
      return 'ярко-розовый'
    case 'DeepPink':
      return 'темно-розовый'
    case 'MediumVioletRed':
      return 'розово-фиолетовый'
    case 'PaleVioletRed':
      return 'бледно-розовый'
    case 'Coral':
      return 'коралловый'
    case 'Tomato':
      return 'ярко-оранжевый'
    case 'OrangeRed':
      return 'красно-оранжевый'
    case 'DarkOrange':
      return 'темно-оранжевый'
    case 'Orange':
      return 'оранжевый'
    case 'LightYellow':
      return 'светло-желтый'
    case 'LemonChiffon':
      return 'шифон'
    case 'PapayaWhip':
      return 'папая'
    case 'Moccasin':
      return 'мокасин'
    case 'PeachPuff':
      return 'персиковый'
    case 'PaleGoldenrod':
      return 'желто-зеленый'
    case 'Khaki':
      return 'хаки'
    case 'DarkKhaki':
      return 'темный хаки'
    case 'Lavender':
      return 'лавандовый'
    case 'Thistle':
      return 'темно-лавандовый'
    case 'Plum':
      return 'сливовый'
    case 'Violet':
      return 'фиалковый'
    case 'Orchid':
      return 'темно-фиалковый'
    case 'Fuchsia':
      return 'фуксия'
    case 'MediumPurple':
      return 'темно-фиалковый'
    case 'BlueViolet':
      return 'сине-фиолетовый'
    case 'Indigo':
      return 'индиго'
    case 'SandyBrown':
      return 'оранжево-коричневый'
    case 'NavajoWhite':
      return 'желто-коричневый'
    case 'Goldenrod':
      return 'золотарник'
    case 'DarkGoldenRod':
      return 'темный золотарник'
    case 'Chocolate':
      return 'шоколадный'
    case 'Sienna':
      return 'темно-коричневый'
    case 'Brown':
      return 'коричневый'
    case 'Maroon':
      return 'красно-коричневый'
    case 'GreenYellow':
      return 'желто-зеленый'
    case 'LawnGreen':
      return 'ярко-зеленый'
    case 'Lime':
      return 'лайм'
    case 'LimeGreen':
      return 'темный лайм'
    case 'PaleGreen':
      return 'бледный-зеленый'
    case 'MediumSpringGreen':
      return 'бирюзовый'
    case 'MediumSeaGreen':
      return 'темно-зеленый'
    case 'SeaGreen':
      return 'цвет морской волны'
    case 'Green':
      return 'зеленый'
    case 'Aqua':
      return 'ярко-бирюзовый'
    case 'LightCyan':
      return 'светло-голубой'
    case 'PaleTurquoise':
      return 'бледно-бирюзовый'
    case 'Turquoise':
      return 'светлая бирюза'
    case 'SkyBlue':
      return 'светло-голубой'
    case 'DeepSkyBlue':
      return 'темно-голубой'
    case 'DodgerBlue':
      return 'светло-синий'
    case 'Blue':
      return 'синий'
    case 'DarkBlue':
      return 'темно-синий'

    default:
      return 'Неизвестный цвет'
  }
}

const AddNewGood = () => {
  const { register, handleSubmit } = useForm()
  const [selectedColors, setSelectedColors] = useState([])
  const [colorImages, setColorImages] = useState({})
  const [imageName, setImageName] = useState('')
  //хранить название загруженной картинки

  const [colorQuantities, setColorQuantities] = useState({})
  const [openAdditionalColors, setOpenAdditionalColors] = useState(false)
  //добавление нового цвета
  const { getAllItems } = ItemServices()
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

  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const handleImageUpload = (color, e) => {
    const file = e.target.files[0]
    const storageRef = ref(imgDB, `Images/${file.name}`)
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            setColorImages((prevColorImages) => ({
              ...prevColorImages,
              [color]: url,
            }))
            setImageName(file.name)
          })
          .catch((error) => {
            console.log('Error getting download URL: ', error)
          })
      })
      .catch((error) => {
        console.log('Error uploading file: ', error)
      })
  }

  const handleQuantityChange = (color, e) => {
    const quantity = e.target.value
    setColorQuantities({ ...colorQuantities, [color]: quantity })
  }

  return (
    <section className={st.create}>
      <div className="container">
        <div className={st.wrapperCreate}>
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
                type="number"
                id="price"
                style={{ width: '150px' }}
                required
              />
            </div>
            {/* категории */}
            <div className={st.formSubtitle}>
              <label>Категория</label>
              <select id="category" {...register('category')} defaultValue="">
                <option value="" disabled hidden>
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
              <label>Основные цвета: </label>
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
            {/* Поля для загрузки картинок и указания количества */}
            <div className={st.chooseColorTop}>
              <h4>Выбранные цвета:</h4>
              <div
                className={st.notFoundColor}
                onClick={() => setOpenAdditionalColors(!openAdditionalColors)}
              >
                {openAdditionalColors ? (
                  <p>Скрыть дополнительные цвета</p>
                ) : (
                  <p>Не нашли подходящий цвет?</p>
                )}
              </div>
            </div>
            <div className={st.allImageColors}>
              {selectedColors.map((color) => (
                <div key={color} className={st.itemImage}>
                  <label htmlFor={`image-${color}`} className={st.colorsCont}>
                    <p> Изображение для цвета:</p>
                    <p
                      className={st.chooseColor}
                      style={{
                        backgroundColor: color,
                        border: '1px solid #000',
                      }}
                    ></p>
                  </label>
                  <div className={st.countItemImage}>
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
                      required
                    />
                  </div>
                  <input
                    type="file"
                    id={`image-${color}`}
                    onChange={(e) => handleImageUpload(color, e)}
                    required
                  />
                  {colorImages[color] && (
                    <div className={st.imgColor}>
                      <img src={colorImages[color]} alt="изображение" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className={st.btnCreateNew} type="submit">
              Создать
            </button>
          </form>
          {openAdditionalColors && (
            <div className={st.additionalColors}>
              <h2>Дополнительные цвета</h2>
              <h4 className={st.subtitleColor}>Красные тона:</h4>
              <ul className={st.colorWrapper}>
                {redColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Розовые тона:</h4>
              <ul className={st.colorWrapper}>
                {pinkColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Оранжевые тона:</h4>
              <ul className={st.colorWrapper}>
                {orangeColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Жёлтые тона:</h4>
              <ul className={st.colorWrapper}>
                {yellowColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Фиолетовые тона:</h4>
              <ul className={st.colorWrapper}>
                {purpleColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Коричневые тона:</h4>
              <ul className={st.colorWrapper}>
                {brownColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Зеленые тона:</h4>
              <ul className={st.colorWrapper}>
                {greenColors.map((color) => (
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
              <h4 className={st.subtitleColor}>Синие тона:</h4>
              <ul className={st.colorWrapper}>
                {blueColors.map((color) => (
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
          )}
        </div>
      </div>
    </section>
  )
}

export default AddNewGood
