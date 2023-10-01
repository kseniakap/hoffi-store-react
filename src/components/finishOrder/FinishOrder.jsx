import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'
import axios from 'axios'
import { useNavigate } from 'react-router'
import ICONS from '../../assets/icons'
import st from './FinishOrder.module.scss'

const FinishOrder = () => {
  const { cart, setCart, ticket, user } = useContext(CustomContext)
  const { reset, register, handleSubmit } = useForm()
  const [isSendOrder, setIsSendOrder] = useState(false)
  const navigate = useNavigate()
  //расчет всей стоимости (с учетом промокода)
  const totalPrice =
    Array.isArray(ticket) && ticket.length
      ? Math.round(
          cart.reduce((acc, rec) => acc + rec.count * rec.price, 0) -
            (cart.reduce((acc, rec) => acc + rec.count * rec.price, 0) / 100) *
              ticket[0].procent,
        )
      : cart.reduce((acc, rec) => acc + rec.count * rec.price, 0)

  const sendOrder = async (data) => {
    try {
      await axios.post(`http://localhost:3001/orders`, {
        ...data,
        goods: cart,
        totalPrice: totalPrice,
        user: user,
      })
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        orders: {
          goods: cart,
          totalPrice: totalPrice,
        },
      })
      reset()
      setCart([])
      setIsSendOrder(true)
    } catch (error) {
      console.error('Возникла ошибка при отправки данных:', error)
    }
  }

  return (
    <>
      <section className={st.finishOrder}>
        {isSendOrder ? (
          <>
            <div className={st.text}>
              <img src={ICONS.iconv1} alt="v1" />
              <p>Ваш заказ успешно отправлен</p>
            </div>
            <Link to="/" className={st.goBack}>
              Вернуться на главную
            </Link>
          </>
        ) : (
          <div className={st.table}>
            <ul className={st.table_top}>
              <li className={st.name}>Название</li>
              <li className={st.colors}>Выбр. цвета</li>
              <li className={st.totalPrice}>Общ. стоимость</li>
            </ul>
            <div className={st.tableContainer}>
              {cart.map((item, idx) => {
                const { name, image, colors, count, price } = item
                return (
                  <ul key={idx} className={st.table_bottom}>
                    <li className={st.name}>
                      <div className={st.image}>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/${image}`}
                          alt={name}
                        />
                      </div>
                      {name}
                    </li>
                    <li className={st.colors}>{colors}</li>
                    <li className={st.totalPrice}>{count * price} ₽</li>
                  </ul>
                )
              })}
            </div>
          </div>
        )}

        <form className={st.forms} onSubmit={handleSubmit(sendOrder)}>
          <div className={st.form_user}>
            <h2 className={st.title}>Ваши данные</h2>
            <input
              {...register('name')}
              type="text"
              placeholder="Имя"
              defaultValue={user.name || ''}
            />
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              defaultValue={user.email || ''}
            />
            <input
              {...register('tel')}
              className={st.forms_tel}
              type="tel"
              placeholder="Телефон"
              defaultValue={user.tel || ''}
            />
          </div>
          <div className={st.adress}>
            <h2 className={st.title}>Введите адрес доставки</h2>
            <input {...register('city')} type="text" placeholder="Город" />
            <input {...register('street')} type="text" placeholder="Улица" />
            <input {...register('house')} type="number" placeholder="Дом" />
            <input {...register('flat')} type="number" placeholder="Квартира" />
            <textarea
              {...register('additional')}
              name=""
              id=""
              placeholder="Уточнения по адресу"
            />
          </div>
          <button type="submit">Заказать</button>
        </form>
      </section>
      {isSendOrder ? null : (
        <>
          <hr />
          <div className={st.result}>
            <div>
              {Array.isArray(ticket) && ticket.length ? (
                <div>
                  <p>Подытог:</p>
                  <span>
                    {cart.reduce((acc, rec) => acc + rec.count * rec.price, 0)}₽
                  </span>
                </div>
              ) : null}
            </div>
            <div>
              {Array.isArray(ticket) && ticket.length ? (
                <p>Итого с учетом промокода:</p>
              ) : (
                <p> Итого :</p>
              )}

              <span>{totalPrice}₽</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default FinishOrder
