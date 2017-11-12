import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Chart from './Chart'

const style = {
  backgroundColor: 'rgba(0,0,0,0)'
}

export const StockHistory = ({ handleOpen, displayChart, data, symbol }) => (
  <Modal trigger={<Button size='mini' icon='bar chart' />} style={style} >
    {displayChart && <Chart data={data} />}
  </Modal>
)
