import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter } from 'react-icons/fa6'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import st from './TeamPerson.module.scss'

const TeamPerson = ({ item }) => {
  const { id, name, prof, img } = item

  return (
    <div className={st.item}>
      <Link to={`/members/${id}`}>
        <div className={st.image}>
          <LazyLoadImage
            src={'./img/members/' + img}
            alt={name}
            effect="blur"
          />
        </div>
      </Link>
      <p className={st.item_name}>{name}</p>
      <p className={st.item_prof}>{prof}</p>
      <div className={st.social}>
        <a href="http: facebook.com.vn">
          <FaFacebookF className={st.social_icon} />
        </a>
        <a href="https: twitter.com/">
          <FaTwitter className={st.social_icon} />
        </a>
      </div>
    </div>
  )
}

export default TeamPerson
