import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import ICONS from '../../assets/icons'
import st from './FinishOrder.module.scss'

const FinishOrder = () => {
  const {
    cart,
    setCart,
    ticket,
    setTicket,
    user,
    setUser,
    formatPrice,
  } = useContext(CustomContext)

  const { reset, register, handleSubmit } = useForm()
  const [isSendOrder, setIsSendOrder] = useState(false)

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
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders`, {
        ...data,
        goods: cart,
        totalPrice: totalPrice,
        date: new Date(),
      })
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`, {
        orders: [
          ...user.orders,
          {
            goods: cart,
            totalPrice: totalPrice,
            date: new Date(),
          },
        ],
      })

      await axios(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`).then((res) =>
        setUser(res.data),
      )

      if (Array.isArray(ticket) && ticket.length > 0) {
        if (ticket[0].quality > 1) {
          axios
            .patch(`${process.env.REACT_APP_SERVER_URL}/tickets/${ticket[0].id}`, {
              quality: ticket[0].quality - 1,
            })
            .then(() => console.log(''))
        } else if (ticket[0].quality === 1) {
          axios.delete(`${process.env.REACT_APP_SERVER_URL}/tickets/${ticket[0].id}`)
        } else {
          console.error('Возникла ошибка при использовании промокода, повторите позже')
        }
      }

      await reset()
      await setCart([])
      await setIsSendOrder(true)
      await setTicket([])
    } catch (error) {
      console.error('Возникла ошибка при отправки данных:', error)
    }
  }

  return (
    <>
      <section className={st.finishOrder}>
        <div className={st.right}>
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
                  const totalPrice = count * price
                  const path = `${process.env.PUBLIC_URL}/img/${image}`
                  let newPath = path

                  if (path.startsWith('/img/https://')) {
                    newPath = path.substring(5)
                  }

                  return (
                    <ul key={idx} className={st.table_bottom}>
                      <li className={st.name}>
                        <div className={st.image}>
                          <LazyLoadImage
                            src={newPath}
                            alt={name}
                            effect="blur"
                          />
                        </div>
                        {name}
                      </li>
                      <li className={st.colors}>{colors}</li>
                      <li className={st.totalPrice}>
                        {formatPrice(totalPrice)} ₽
                      </li>
                    </ul>
                  )
                })}
              </div>
            </div>
          )}
          {isSendOrder ? null : (
            <>
              <hr />
              <div className={st.result}>
                <div>
                  {Array.isArray(ticket) && ticket.length ? (
                    <div>
                      <p>Подытог:</p>
                      <span className={st.price}>
                        {cart.reduce(
                          (acc, rec) => acc + rec.count * rec.price,
                          0,
                        )}
                        ₽
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

                  <span className={st.price}>{formatPrice(totalPrice)}₽</span>
                </div>
              </div>
            </>
          )}
        </div>

        <form className={st.forms} onSubmit={handleSubmit(sendOrder)}>
          <div className={st.forms_users}>
            <div className={st.forms_top}>
              <h2 className={st.title}>Ваши данные</h2>
              <Link to="/login">Изменить данные</Link>
            </div>

            <input
              {...register('name')}
              type="text"
              placeholder="Имя"
              value={user.name || ''}
              disabled
            />
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              value={user.email || ''}
              disabled
            />
            <input
              {...register('tel')}
              className={st.forms_tel}
              type="tel"
              placeholder="Телефон"
              value={user.tel || ''}
              disabled
            />
          </div>
          <div className={st.adress}>
            <h2 className={st.title}>Введите адрес доставки</h2>
            <input
              {...register('city')}
              type="text"
              placeholder="Город"
              required
            />
            <input
              {...register('street')}
              type="text"
              placeholder="Улица"
              required
            />
            <input
              {...register('house')}
              type="number"
              placeholder="Дом"
              required
            />
            <input {...register('flat')} type="number" placeholder="Квартира" />
            <textarea
              {...register('additional')}
              placeholder="Уточнения по адресу"
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: isSendOrder
                ? ' rgba(205, 162, 116, 0.5)'
                : ' rgb(205, 162, 116)',
              cursor: isSendOrder ? 'auto' : 'pointer',
            }}
            disabled={isSendOrder}
          >
            Заказать
          </button>
        </form>
      </section>
    </>
  )
}

export default FinishOrder
