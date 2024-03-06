import React, { useContext, useState, useRef } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'
import InputMask from 'react-input-mask'
import ChangePassword from '../changePassword/ChangePassword'
import st from './ChangeData.module.scss'

//сомпонент по изменению данных пользователя
const ChangeData = () => {
  const [userChange, setUserChange] = useState(false)
  const { t } = useTranslation()
  const { user, setUser } = useContext(CustomContext)
  const { register, handleSubmit } = useForm()
  const [telValue, setTelValue] = useState(user.tel)

  const changeInfoUser = (data) => {
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`, data)
      .then(({ data }) => {
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        setUserChange(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="container">
      <div className={st.wrapperForms}>
        <form
          className={st.personalData}
          onSubmit={handleSubmit(changeInfoUser)}
        >
          <div className={st.subtitle}>{t('accountPage.personData.title')}</div>
          <div className={st.wrapper}>
            <div className={st.name}>
              <p>{t('accountPage.personData.name')}</p>
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
              <p>{t('accountPage.personData.tel')}</p>
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
            <div className={st.name} style={{ width: '190px' }}>
              <p>{t('accountPage.personData.email')}</p>
              {userChange ? (
                <input
                  {...register('email')}
                  type="email"
                  defaultValue={user.email}
                  style={{ width: '100%' }}
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
            {t('accountPage.personData.save')}
          </button>

          <div
            style={{ display: userChange ? 'none' : 'inline-block' }}
            className={`${st.changeBtn} ${st.block}`}
            onClick={() => setUserChange(true)}
          >
            {t('accountPage.personData.change')}
          </div>
        </form>

        {/* Форма для смены парроя */}
        <ChangePassword />
      </div>
    </div>
  )
}
export default ChangeData
