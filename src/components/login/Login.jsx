import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'
import axios from 'axios'
import InputMask from 'react-input-mask'
import ICONS from './../../assets/icons'

import st from './Login.module.scss'

const Login = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()
  const [changeData, setChangeData] = useState(false)
  const { loginUser, user, error } = useContext(CustomContext)
  const { t } = useTranslation()
  return (
    <>
      <section className={st.login}>
        <div className="container">
          {user && user.name ? (
            changeData ? null : (
              <div className={st.login_wrapper}>
                <div className={st.text}>
                  <img src={ICONS.iconv1} alt="v1" />
                  <p>{t('accountPage.login.isLog')}</p>
                </div>
                <button
                  className={st.changeBtn}
                  onClick={() => setChangeData(true)}
                >
                  Хотите изменить данные?
                </button>
              </div>
            )
          ) : (
            <div className={st.login_wrapper}>
              <form onSubmit={handleSubmit(loginUser)} className={st.form}>
                <h2>{t('accountPage.login.title')}</h2>

                <div className={st.login_inputs}>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={t('accountPage.login.inputEmail')}
                  />
                  <input
                    {...register('password')}
                    type="password"
                    placeholder={t('accountPage.login.inputPassword')}
                  />
                  {error && (
                    <p className="error-message">
                      {t('accountPage.login.incorrect')}
                    </p>
                  )}
                </div>
                <button type="submit">
                  {t('accountPage.login.btn')}{' '}
                  <img src={ICONS.iconArrow} alt="arrow" />
                </button>
                <div className={st.login_link}>
                  <p>{t('accountPage.login.text')} </p>
                  <Link to="/register"> {t('accountPage.login.textLink')}</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      {changeData && <ChangeData />}
    </>
  )
}

export default Login

const ChangeData = () => {
  const [userChange, setUserChange] = useState(false)
  const { t } = useTranslation()
  const { user, setUser } = useContext(CustomContext)
  const { register, handleSubmit, reset } = useForm()

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
      <form className={st.personalData} onSubmit={handleSubmit(changeInfoUser)}>
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
              <input {...register('tel')} type="tel" defaultValue={user.tel} />
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
    </div>
  )
}
