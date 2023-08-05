import React from 'react'
import Item from '../item/Item'

import st from "./List.module.scss"

const List = ({ list }) => {
  return (
    <>
      <main className={st.main}>
        {list ? list.map((item) => <Item key={item.id} list={item} />) : <p>Loading...</p>}
      </main>
      <p>Что-то...</p>
    </>
  )
}

export default List
