import React, { useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { CustomContext } from '../../Context'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import st from './TableOfUsers.module.scss'

const TableOfUsers = () => {
  const { allUsers, searchUserByName, searchUserByEmail } = useContext(
    CustomContext,
  )

  const filterArrayByName = allUsers.filter((item) =>
    item.name.toLowerCase().includes(searchUserByName.toLowerCase()),
  )
  const filterArrayByEmail = filterArrayByName.filter((item) =>
    item.name.toLowerCase().includes(searchUserByEmail.toLowerCase()),
  )
  return (
    <div className={st.table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className={st.tableCell}>id</TableCell>
              <TableCell className={st.tableCell}>Email</TableCell>
              <TableCell className={st.tableCell}>Имя пользователя</TableCell>
              <TableCell className={st.tableCell}>Телефон</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterArrayByEmail.length === 0 && (
              <p>Пользователей нет по вашему запросу</p>
            )}
            {filterArrayByEmail.map((user) => (
              <TableRow key={user.id}>
                <TableCell className={st.tableCell}>{user.id}</TableCell>
                <TableCell className={st.tableCell}>{user.email}</TableCell>
                <TableCell className={st.tableCell}>{user.name}</TableCell>
                <TableCell className={st.tableCell}>{user.tel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableOfUsers
