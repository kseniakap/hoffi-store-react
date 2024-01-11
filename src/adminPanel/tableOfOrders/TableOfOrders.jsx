import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { CustomContext } from '../../Context'
import axios from 'axios'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import st from './TableOfOrders.module.scss'

const TableOfOrders = () => {
  const { BASE_URL } = useContext(CustomContext)
  const [order, setOrder] = useState([])
  useEffect(() => {
    axios(`${BASE_URL}/orders`).then(({ data }) => setOrder(data))
  }, [])

  // const filterArrayByEmail = order.filter((item) =>
  //   item.goods?.name?.toLowerCase().includes(searchOrder.toLowerCase()),
  // )
  console.log(order)
  return (
    <div className={st.table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 65 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className={st.tableCell}>Номер заказа</TableCell>
              <TableCell className={st.tableCell}>Название продукта</TableCell>
              {/* <TableCell className={st.tableCell}>Количество</TableCell> */}
              <TableCell className={st.tableCell}>Покупатель</TableCell>
              <TableCell className={st.tableCell}>Город доставки</TableCell>
              <TableCell className={st.tableCell}>Дата</TableCell>
              <TableCell className={st.tableCell}>Общее количество</TableCell>
              <TableCell className={st.tableCell}>Стоимость</TableCell>
              {/* <TableCell className={st.tableCell}>метод</TableCell>
              <TableCell className={st.tableCell}>статус</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={st.tableCell}>{row.id}</TableCell>
                {row.goods.map((item, idx) => (
                  <TableCell
                    style={{ display: 'flex', flexDirection: 'column' }}
                    key={idx}
                    className={st.tableCell}
                  >
                    <div className={st.goodWrapper}>
                      <img
                        src={`/img/${item.image}`}
                        className={st.image}
                        alt="фото товара"
                      />

                      <div style={{ width: '250px', marginRight: '20px' }}>
                        {' '}
                        {item.name}
                      </div>
                      <p> {item.count}</p>
                    </div>
                  </TableCell>
                ))}

                <TableCell className={st.tableCell}>{row.customer}</TableCell>
                <TableCell className={st.tableCell}>{row.city}</TableCell>
                <TableCell className={st.tableCell}>{row.date}</TableCell>
                <TableCell className={st.tableCell}>
                  {row.goods[0].count}
                </TableCell>
                <TableCell className={st.tableCell}>
                  {row.goods[0].price}
                </TableCell>
                {/* <TableCell className={st.tableCell}>{row.method}</TableCell>
                <TableCell className={st.tableCell}>{row.status}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableOfOrders
