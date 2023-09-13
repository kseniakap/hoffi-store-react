import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter } from 'react-icons/fa6'
import st from './TeamPerson.module.scss'

const TeamPerson = ({ img, name, prof }) => {
  return (
    <div className={st.item}>
      <Link to="/">
        <img src={img} alt={name} />
      </Link>
      <p className={st.item_name}>{name}</p>
      <p className={st.item_prof}>{prof}</p>
      <div className={st.social}>
        <a href="http://facebook.com.vn">
          <FaFacebookF className={st.social_icon} />
        </a>
        <a href="https://twitter.com/">
          <FaTwitter className={st.social_icon} />
        </a>
      </div>
    </div>
  )
}

export default TeamPerson
