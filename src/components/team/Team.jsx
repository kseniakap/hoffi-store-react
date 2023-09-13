import React from 'react'
import TeamPerson from './TeamPerson'
import IMAGES from '../../assets/img'
import st from './Team.module.scss'

const Team = () => {
  const team = [
    {
      img: IMAGES.person_1,
      name: 'Иван Смирнов ',
      prof: 'директор мебельного салона',
    },
    {
      img: IMAGES.person_2,
      name: 'Наталья Смирнова ',
      prof: 'менеджер по продажам мебели',
    },
    {
      img: IMAGES.person_3,
      name: 'Ирина Новикова',
      prof: 'дизайнер',
    },
    {
      img: IMAGES.person_4,
      name: 'Светлана Иванова',
      prof: 'дизайнер',
    },
    {
      img: IMAGES.person_5,
      name: 'Макс Цветков',
      prof: 'креативный дизайнер',
    },
    {
      img: IMAGES.person_6,
      name: 'Никита Смирнов',
      prof: 'менеджер',
    },
    {
      img: IMAGES.person_7,
      name: 'Анна Хохлова',
      prof: 'дизайнер-консультант',
    },
    {
      img: IMAGES.person_8,
      name: 'Алексей Виноградов',
      prof: 'художник-дизайнер',
    },
  ]
  return (
    <>
      <section className={st.team}>
        <div className="container">
          <div className={st.team_wrapper}>
            {team.map((item, i) => {
              return <TeamPerson key={i} {...item} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
