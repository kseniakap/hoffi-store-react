import React, { useContext, useState, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'

import st from './ChangePassword.module.scss'

const ChangePassword = () => {
  const bcrypt = require('bcryptjs')

  const [passwordChange, setUserPassword] = useState(false)
  const { register, handleSubmit } = useForm()
  const { user, setUser } = useContext(CustomContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [isCorrectOldPassword, setIsCorrectOldPassword] = useState(false)
  const [errorComfirm, setErrorComfirm] = useState(false)
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)
  //  состояние  для отображения сообщения об успешном изменении пароля

  const handleChangePassword = (data) => {
    axios(`http://localhost:3001/users/${user.id}`, data).then(({ data }) => {
      const encryptedPasswordFromServer = data.password

      bcrypt.compare(
        oldPassword,
        encryptedPasswordFromServer,
        (err, result) => {
          if (err) {
            console.error('Ошибка при сравнении паролей:', err)
            // Обработка ошибки при сравнении
          } else if (result) {
            // Старый пароль верный, можно продолжить изменение пароля
            if (newPassword === confirmNewPassword) {
              console.log('Пaроли совпадают')
              if (newPassword.length >= 6) {
                setErrorComfirm(false)
                const newDataoOfPassword = {
                  password: newPassword,
                }
                axios
                  .patch(
                    `http://localhost:3001/users/${user.id}`,
                    newDataoOfPassword,
                  )
                  .then(({ data }) => {
                    setUser(data)
                    localStorage.setItem('user', JSON.stringify(data))
                    setPasswordChangeSuccess(true)
                    setErrorComfirm(false)
                  })
                  .catch((error) => {
                    console.error('Ошибка при изменении пароля:', error)
                  })
              }
            } else {
              setErrorComfirm(true)
            }
          } else {
            console.log('Старый пароль не верный')
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
      <div className={st.subtitle}>Изменить пароль</div>
      {passwordChange && (
        <div className={st.wrapper}>
          <div className={st.name}>
            <p>Старый пароль</p>
            <input
              {...register('password')}
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          {isCorrectOldPassword && <p>Старый пароль неверный</p>}
          <div className={st.name}>
            <p>Новый пароль</p>
            <input
              {...register('newPassword')}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={st.name}>
            <p>Потвердить новый пароль</p>
            <input
              {...register('NewPasswordComfirn')}
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          {errorComfirm && <p>Пароли не совпадают</p>}
        </div>
      )}

      <button
        style={{ display: passwordChange ? 'block' : 'none' }}
        type="submit"
        className={st.changeBtn}
      >
        Сохранить
      </button>

      <div
        style={{ display: passwordChange ? 'none' : 'inline-block' }}
        className={`${st.changeBtn} ${st.block}`}
        onClick={() => setUserPassword(true)}
      >
        Изменить
      </div>
      {passwordChangeSuccess && (
        <div className={st.successMessage}>Пароль успешно изменен!</div>
      )}
    </form>
  )
}

export default ChangePassword
