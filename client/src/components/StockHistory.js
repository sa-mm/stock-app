import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Chart from './Chart'

export const StockHistory = ({ handleOpen, displayChart, data, symbol }) => (
  <Modal trigger={<Button size='mini' icon='bar chart' />} >
    <Modal.Header>Historical Data for {symbol} (last 10 days)</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {displayChart && <Chart data={data} />}
      </Modal.Description>
    </Modal.Content>
  </Modal>
)
