import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Chart from './Chart'

export const StockHistory = (props) => (
  <Modal onOpen={props.handleOpen} trigger={<Button size='mini'>Historical Data</Button>} >
    <Modal.Header>Historical Data for {props.symbol}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {/* <ul>
        {listItems}
      </ul> */}
        <Chart />
      </Modal.Description>
    </Modal.Content>
  </Modal>
)
