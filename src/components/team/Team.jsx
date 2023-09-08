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
      prof: 'дизайнер',
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
