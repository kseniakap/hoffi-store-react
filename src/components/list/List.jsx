import { useState, useEffect } from 'react'
import React from 'react'
import Item from '../item/Item'
import ItemServices from './../../services/ItemServices'
import st from './List.module.scss'

const List = () => {
  const [list, setList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [charEnded, setCharEnded] = useState(false)

  const { loading, error, getAllItems } = ItemServices()

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllItems().then(onCharListLoaded)
  }

  const onCharListLoaded = (newcharList) => {
    let ended = false
    if (newcharList.length < 9) {
      ended = true
    }
    setList((charList) => [...charList, ...newcharList])
    setNewItemLoading(false);
    setCharEnded(ended)
  }

  function renderItems(arr) {
    const items = arr.map((item) => {
      return <Item key={item.id} list={item} />
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
      {/* <button disabled={setNewItemLoading}></button> */}
    </>
  )
}

export default List
