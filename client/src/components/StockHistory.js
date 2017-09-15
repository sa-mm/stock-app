import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Chart from './Chart'

export const StockHistory = (props) => (
  <Modal onOpen={props.handleOpen} trigger={<Button size='mini' icon='bar chart' />} >
    <Modal.Header>Historical Data for {props.symbol} (last 10 days)</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {props.displayChart && <Chart data={props.data} />}
      </Modal.Description>
    </Modal.Content>
  </Modal>
)
