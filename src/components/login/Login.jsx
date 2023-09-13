import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'

import ICONS from './../../assets/icons'

import st from './Login.module.scss'

const Login = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()

  const { loginUser, user, error } = useContext(CustomContext)
  const { t } = useTranslation()
  return (
    <>
      <section className={st.login}>
        <div className="container">
          <div className={st.login_wrapper}>
            {user && user.login ? (
              <div className={st.text}>
                <img src={ICONS.iconv1} alt="v1" />
                <p>{t('accountPage.login.isLog')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(loginUser)}>
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
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
