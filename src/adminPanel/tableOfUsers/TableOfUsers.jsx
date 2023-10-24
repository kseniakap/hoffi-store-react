import React, { useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import st from './TableOfUsers.module.scss'
import { CustomContext } from '../../Context'

const TableOfUsers = () => {
  const { allUsers } = useContext(CustomContext)

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'email', headerName: 'Email' },
    { field: 'name', headerName: 'Имя пользователя' },
    { field: 'tel', headerName: 'Телефон' },
  ]

  return (
    <div className={st.table}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default TableOfUsers
