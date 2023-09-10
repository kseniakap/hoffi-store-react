import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'

import st from './Login.module.scss'

const Login = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()

  const { loginUser, error } = useContext(CustomContext)

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(loginUser)}>
          <h2>Вход в акк</h2>
          <input
            {...register('email')}
            type="email"
            placeholder="Введите email"
          />
          <br />
          <input
            {...register('password')}
            type="password"
            placeholder="Введите пароль"
          />
          <br />
          {error && <p className="error-message">Неверный пароль</p>}
          <button type="submit">Войти </button>
          <br />
          <p>
            Нет аккаунта? <Link to="/register">Создайте его прямо сейчас!</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login
