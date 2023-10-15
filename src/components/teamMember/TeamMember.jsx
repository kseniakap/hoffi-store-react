import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import emailImg from './email.svg'
import telImg from './tel.svg'
import siteImg from './site.svg'
import { useTranslation } from 'react-i18next'
import './../../style/style.scss'
import st from './TeamMember.module.scss'

const TeamMember = () => {
  const params = useParams()
  const [member, setMember] = useState({})
  const { t } = useTranslation()

  useEffect(() => {
    axios(`http://localhost:3001/${t('url.allMembers')}/${params.id}`)
      .then(({ data }) => setMember(data))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const { name, prof, img, bio, email, number, linkSite } = member

  return (
    <section className={st.member}>
      <div className="container">
        <div className={st.member__wrapper}>
          <div className={st.member__img}>
            <LazyLoadImage
              src={`${process.env.PUBLIC_URL}/img/members/${img}`}
              alt={name}
              effect="blur"
              width="100%"
              height="100%"
            />
          </div>
          <div className={st.member__content}>
            <h2 className="title">{name}</h2>
            <p>{prof}</p>
            <div className={st.member__bio}>{bio}</div>
            <div className={st.member__link}>
              <div className={st.member__item}>
                <img src={emailImg} alt="img email" />
                <div>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
              <div className={st.member__item}>
                <img src={telImg} alt="img tel" />
                <div>
                  <a href={`tel:${number}`}>{number}</a>
                </div>
              </div>
              <div className={st.member__item}>
                <img src={siteImg} alt="img site" />
                <div>
                  <a href="linkSite">{linkSite}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamMember
