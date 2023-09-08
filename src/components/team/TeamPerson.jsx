import React from 'react'

const TeamPerson = ({ img, name, prof }) => {
  return (
    <div className="">
      <img src={img} alt={name} />
      <p className="">{name}</p>
    </div>
  )
}

export default TeamPerson
