import React, { useEffect, useState } from 'react'
import TeamPerson from './TeamPerson'
import ItemServices from './../../services/ItemServices'
import IMAGES from '../../assets/img'
import st from './Team.module.scss'

const Team = () => {
  const [newItemLoading, setNewMemberLoading] = useState(false)
  const { loading, error, getAllMembers } = ItemServices()
  const [members, setMembers] = useState([])

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewMemberLoading(false) : setNewMemberLoading(true)
    getAllMembers().then(onListItemLoaded)
  }

  const onListItemLoaded = (newcharList) => {
    setMembers(newcharList)
    setNewMemberLoading(false)
  }

  function renderMembers(arr) {
    const items = arr.map((item, i) => {
      return <TeamPerson key={i} item={item} />
    })
    return <div className={st.team_wrapper}>{items}</div>
  }

  const allMembers = renderMembers(members)
  const errorMessage = error ? 'error' : null
  const spinner = loading && !newItemLoading ? <Loading /> : null
  return (
    <>
      <section className={st.team}>
        <div className="container">
          {errorMessage}
          {spinner}
          {allMembers}
        </div>
      </section>
    </>
  )
}

const Loading = () => {
  return (
    <div className={st.loading}>
      <img src={IMAGES.loadingGif} alt="loading..." />
    </div>
  )
}
export default Team
