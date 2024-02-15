import React, { useContext, useState, useRef } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'

import st from './ChangePassword.module.scss'

const ChangePassword = () => {
  const bcrypt = require('bcryptjs')

  const [passwordChange, setUserPassword] = useState(false)
  const { register, handleSubmit } = useForm()
  const { user, setUser, BASE_URL } = useContext(CustomContext)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isCorrectOldPassword, setIsCorrectOldPassword] = useState(false)
  const [errorNewOldPassword, setErrorNewPasword] = useState(false)
  const [errorComfirm, setErrorComfirm] = useState(false)
  const [paswordLength, setPasswordLenght] = useState(false)
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)
  //  состояние  для отображения сообщения об успешном изменении пароля
  const { t } = useTranslation()

  const reserAllError = () => {
    setErrorNewPasword(false)
    setIsCorrectOldPassword(false)
    setErrorComfirm(false)
    setPasswordLenght(false)
  }

  const handleChangePassword = (data) => {
    axios(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`, data).then(({ data }) => {
      const encryptedPasswordFromServer = data.password

      bcrypt.compare(
        oldPassword,
        encryptedPasswordFromServer,
        (err, result) => {
          if (err) {
            console.error('Ошибка при сравнении паролей:', err)
          } else if (result) {
            setIsCorrectOldPassword(false)

            if (newPassword === confirmNewPassword) {
              setErrorComfirm(false)
              if (newPassword === oldPassword) {
                // Старый пароль совпадает с новым
                setErrorNewPasword(true)
              } else {
                setErrorNewPasword(false)

                if (newPassword.length >= 6) {
                  setPasswordLenght(false)
                  setErrorComfirm(false)
                  const newDataoOfPassword = {
                    password: newPassword,
                  }
                  axios
                    .patch(
                      `${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,
                      newDataoOfPassword,
                    )
                    .then(({ data }) => {
                      // Очистка полей после успешной смены пароля
                      setOldPassword('')
                      setNewPassword('')
                      setConfirmNewPassword('')

                      setUser(data)
                      localStorage.setItem('user', JSON.stringify(data))
                      setPasswordChangeSuccess(true)
                      setErrorComfirm(false)
                      setUserPassword(false)

                      // Запуск таймера для скрытия сообщения через 5 секунд
                      setTimeout(() => {
                        setPasswordChangeSuccess(false)
                      }, 5000)
                    })
                    .catch((error) => {
                      console.error('Ошибка при изменении пароля:', error)
                    })
                } else {
                  setPasswordLenght(true)
                }
              }
            } else {
              setErrorComfirm(true)
            }
          } else {
            setIsCorrectOldPassword(true)
          }
        },
      )
    })
  }

  return (
    <form
      className={st.personalData}
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <div className={st.subtitle}>{t('accountPage.changePassword.title')}</div>
      {passwordChange && (
        <div className={st.wrapper}>
          <div className={`${st.name} ${st.namePassword}`}>
            <p>{t('accountPage.changePassword.oldPassword')}</p>
            <input
              {...register('password')}
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value)
                reserAllError()
              }}
              required
            />
          </div>

          <div className={st.name}>
            <p>{t('accountPage.changePassword.newPassword')}</p>
            <input
              {...register('newPassword')}
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
                reserAllError()
              }}
              required
            />
          </div>
          <div className={st.name}>
            <p>{t('accountPage.changePassword.corfirmPassword')}</p>
            <input
              {...register('NewPasswordComfirn')}
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value)
                reserAllError()
              }}
              required
            />
          </div>
        </div>
      )}
      {isCorrectOldPassword && (
        <p> {t('accountPage.errors.oldPasswordIsIncorrect')}</p>
      )}
      {errorNewOldPassword && (
        <p> {t('accountPage.errors.oldNewPasswordSame')}</p>
      )}
      {errorComfirm && <p> {t('accountPage.errors.notRequired')}</p>}
      {paswordLength && <p>{t('accountPage.errors.moreSixChar')}</p>}

      <button
        style={{ display: passwordChange ? 'block' : 'none' }}
        type="submit"
        className={st.changeBtn}
      >
        {t('accountPage.personData.save')}
      </button>

      <div
        style={{ display: passwordChange ? 'none' : 'inline-block' }}
        className={`${st.changeBtn} ${st.block}`}
        onClick={() => {
          setUserPassword(true)
          setOldPassword('')
          setNewPassword('')
          setConfirmNewPassword('')
        }}
      >
        {t('accountPage.personData.change')}
      </div>
      {passwordChangeSuccess && (
        <div className={st.successMessage}>
          {t('accountPage.successCghange')}
        </div>
      )}
    </form>
  )
}

export default ChangePassword
