import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'

import ChangeData from '../changeData/ChangeData'
import ICONS from '../../assets/icons'

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
                <p>*Данные админа: admin@gmail.com, 111111 </p>
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
