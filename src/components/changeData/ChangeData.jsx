import React, { useContext, useState, useRef } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'
import InputMask from 'react-input-mask'
import ChangePassword from '../changePassword/ChangePassword'
import st from './ChangeData.module.scss'

const ChangeData = () => {
  const [userChange, setUserChange] = useState(false)

  const { t } = useTranslation()
  const { user, setUser } = useContext(CustomContext)
  const { register, handleSubmit } = useForm()

  const [telValue, setTelValue] = useState(user.tel)

  const changeInfoUser = (data) => {
    axios
      .patch(`http://localhost:3001/users/${user.id}`, data)
      .then(({ data }) => {
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        setUserChange(false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }



  return (
    <div className="container">
      <div className={st.wrapperForms}>
        <form
          className={st.personalData}
          onSubmit={handleSubmit(changeInfoUser)}
        >
          <div className={st.subtitle}>Личные данные</div>
          <div className={st.wrapper}>
            <div className={st.name}>
              <p>Имя</p>
              {userChange ? (
                <input
                  {...register('name')}
                  type="text"
                  defaultValue={user.name}
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>
            <div className={st.name}>
              <p>Номер телефона</p>
              {userChange ? (
                <InputMask
                  {...register('tel')}
                  mask={t('accountPage.login.loginMask')}
                  type="tel"
                  value={telValue}
                  onChange={(e) => setTelValue(e.target.value)}
                />
              ) : (
                <span>{user.tel}</span>
              )}
            </div>
            <div className={st.name}>
              <p>Почта</p>
              {userChange ? (
                <input
                  {...register('email')}
                  type="email"
                  defaultValue={user.email}
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
          </div>

          <button
            style={{ display: userChange ? 'block' : 'none' }}
            type="submit"
            className={st.changeBtn}
          >
            Сохранить
          </button>

          <div
            style={{ display: userChange ? 'none' : 'inline-block' }}
            className={`${st.changeBtn} ${st.block}`}
            onClick={() => setUserChange(true)}
          >
            Изменить
          </div>
        </form>

        {/* Форма для смены парроя */}
        <ChangePassword />
      </div>
    </div>
  )
}
export default ChangeData
