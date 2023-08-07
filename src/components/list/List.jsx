import { useState, useEffect } from 'react'
import React from 'react'
// import { Link } from 'react-router-dom';

import Item from '../item/Item'
import ItemServices from './../../services/ItemServices'

import st from './List.module.scss'

const List = ({addToOrder}) => {
  const [list, setList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const { loading, error, getAllItems } = ItemServices()

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllItems().then(onListItemLoaded)
  }

  const onListItemLoaded = (newcharList) => {
    setList((list) => [...list, ...newcharList])
    setNewItemLoading(false)
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return <Item key={i} list={item} addToOrder={addToOrder}/>
    })
    return <div className={st.main}>{items}</div>
  }

  const items = renderItems(list)
  const errorMessage = error ? 'error' : null
  const spinner = loading && !newItemLoading ? 'loading...' : null

  return (
    <>
      {errorMessage}
      {spinner}
      {items}
      <button className={st.btn} onClick={() => onRequest()}>
        Увидеть больше
      </button>
    </>
  )
}

export default List
