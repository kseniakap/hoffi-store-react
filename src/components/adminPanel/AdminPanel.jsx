import React from 'react'
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import PostListGoods from './goods/PostListGoods'
import "./adminPanel.scss"

const AdminPanel = () => {
  return (
    <section>
      <Admin dataProvider={restProvider('http://localhost:3001/')}>
        <Resource name="goods" list={PostListGoods} />
      </Admin>
    </section>
  )
}

export default AdminPanel
