import React, {useContext} from 'react'
import { FaAngleUp, FaUser, FaShoppingBasket, FaMoneyCheckAlt, FaMoneyCheck} from 'react-icons/fa'
import ICONS from '../../assets/icons'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import st from './Widget.module.scss'

const Widgets = ({ type }) => {
  const { allUsers } = useContext(CustomContext);
  
  let data

  switch (type) {
    case 'user':
      data = {
        title: 'КОЛИЧЕСТВО ПОЛЬЗОВАТЕЛЕЙ',
        isMoney: false,
        number:allUsers.length,
        link:"/admin/users",
        linkText: 'увидеть больше',
        icon: <FaUser className={st.icon} />,
      }
      break
    case 'order':
      data = {
        title: 'ЗАКАЗЫ',
        isMoney: true,
        number:100,
        link:"admin/users",
        linkText: 'увидеть все заказы',
        icon: <FaShoppingBasket className={st.icon} />,
      }
      break
    case 'erarning':
      data = {
        title: 'ПРИБЫЛЬ',
        isMoney: true,
        number:100,
        link:"admin/users",
        linkText: 'посмотреть статистику',
        icon: <FaMoneyCheckAlt className={st.icon} />,
      }
      break
    case 'balance':
      data = {
        title: 'БАЛАНС',
        isMoney: true,
        number:100,
        link:"admin/users",
        linkText: 'увидеть больше',
        icon: <FaMoneyCheck className={st.icon} />,
      }
      break
    default:
      break
  }
  return (
    <div className={st.widget}>
      <div className={st.left}>
        <span className={st.title}>{data.title}</span>
        <span className={st.counter}>{data.number} {data.isMoney && "$"} </span>
        <Link to={data.link} className={st.link}>
          {data.linkText}
          <img src={ICONS.iconArrow} alt="стрелка" />
        </Link>
      </div>
      <div className={st.right}>
        {data.icon}
      </div>
    </div>
  )
}

export default Widgets
