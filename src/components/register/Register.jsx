import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import st from './Register.module.sass'

const Register = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()
  const { errors } = formState
  const { registerUser } = useContext(CustomContext)

  const password = watch('password')

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(registerUser)}>
          <h2>Регистрация</h2>
          <input
            {...register('login')}
            type="text"
            placeholder="Введите логин"
          />
          <br />
          <input
            {...register('email')}
            type="email"
            placeholder="Введите email"
          />
          <br />
          <input
            {...register('tel')}
            type="tel"
            placeholder="Введите телефон"
          />
          <br />
          <input
            {...register('password')}
            type="password"
            placeholder="Введите пароль"
          />
          <br />
          <input
            {...register('confirmPassword', {
              validate: (value) => value === password || 'Пароли не совпадают',
            })}
            type="password"
            placeholder="Подтвердить пароль"
            autoComplete="new-password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <br />
          <button type="submit">Зарегистрироваться</button>
          <br />
          <p>
            Есть аккаунт? <Link to="/login">Войти в него</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register
