import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import st from './Chart.module.scss'

const data = [
  { name: 'Juanuary', total: 344993 },
  { name: 'February', total: 684732 },
  { name: 'March', total: 805453 },
  { name: 'April', total: 90993 },
  { name: 'May', total: 644993 },
  { name: 'June', total: 233432 },
]

const Chart = () => {
  return (<></>
    // <div className={st.chart}>
    //     <div className={st.title}>Доходы за последние 6 месяцев</div>
    //   <ResponsiveContainer width="100%" aspect={2 / 1}>
    //     <AreaChart
    //       width={730}
    //       height={250}
    //       data={data}
    //       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    //     >
    //       <defs>
    //         <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
    //           <stop offset="5%" stopColor="rgb(205, 162, 116)" stopOpacity={0.8} />
    //           <stop offset="95%" stopColor="rgb(205, 162, 116)" stopOpacity={0} />
    //         </linearGradient>
    //       </defs>
    //       <XAxis dataKey="name"  />
    //       {/* <YAxis /> */}
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <Tooltip />
    //       <Area
    //         type="monotone"
    //         dataKey="total"
    //         stroke=" rgb(205, 162, 116)"
    //         fillOpacity={1}
    //         fill="url(#total)"
    //       />
    //     </AreaChart>
    //   </ResponsiveContainer>
    // </div>
  )
}

export default Chart
