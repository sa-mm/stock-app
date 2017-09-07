import React, { Component } from 'react'
import { Grid, Table, Button } from 'semantic-ui-react'

const StockButton = (props) => {
  const handleClick = (event) => {
    props.actions.onSymbolSubmit(props.symbol)
  }

  return (
    <Button size='mini' onClick={handleClick}>View Stock</Button>
  )
}

class TitleBar extends Component {
  render () {
    const { balance, stocks } = this.props.portfolio

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    })

    const formatBalance = () => formatter.format(balance)

    const stockRows = !stocks ? '' : stocks.map((stock, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell textAlign='center'>{stock.name}</Table.Cell>
          <Table.Cell textAlign='center'>{stock.quantity}</Table.Cell>
          <Table.Cell textAlign='center'>{stock.pricePaid}</Table.Cell>
          <Table.Cell textAlign='center'><StockButton actions={this.props.actions} symbol={stock.symbol} /></Table.Cell>
        </Table.Row>
      )
    })

    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              Current Portfolio
              </Grid.Column>
            <Grid.Column textAlign='right'>
              Cash: {formatBalance()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign='center'>Company</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Price Paid</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.portfolio.stocks ? stockRows : '' }
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default TitleBar
