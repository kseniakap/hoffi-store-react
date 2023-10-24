import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import st from './TableOfOrders.module.scss'

const TableOfOrders = () => {
  const rows = [
    {
      id: 1,
      product: 'Кровать с подъёмным механизмом Nemi 160х200 см  ',
      img:
        'https://firebasestorage.googleapis.com/v0/b/hoffistore-7cd26.appspot.com/o/Images%2Fsofa-bed_scandica_norman_mini_white.jpg?alt=media&token=9ec78bfc-114b-4a21-a219-27bf4a739a30',
      customer: 'James',
      date: '2023-10-15T20:12:00.511Z',
      amount: 26999,
      method: 'online',
      status: 'Approved',
    },
  ]

  return (
    <div className={st.table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className={st.tableCell}>Название продукта</TableCell>
              <TableCell className={st.tableCell}>Покуаатель</TableCell>
              <TableCell className={st.tableCell}>Дата</TableCell>
              <TableCell className={st.tableCell}>стоимотсь</TableCell>
              <TableCell className={st.tableCell}>метод</TableCell>
              <TableCell className={st.tableCell}>статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell>
                  {row.id}
                </TableCell> */}
                <TableCell className={st.tableCell}>
                  <div className={st.goodWrapper}>
                    <img src={row.img} alt="photo" className={st.image}/>
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className={st.tableCell}>{row.customer}</TableCell>
                <TableCell className={st.tableCell}>{row.date}</TableCell>
                <TableCell className={st.tableCell}>{row.amount}</TableCell>
                <TableCell className={st.tableCell}>{row.method}</TableCell>
                <TableCell className={st.tableCell}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableOfOrders
