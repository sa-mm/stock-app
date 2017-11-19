import React, { Component } from 'react'
import { Grid, Table, Button } from 'semantic-ui-react'
import { sortBy, map } from 'lodash'

const noBorder = {
  borderLeft: 0
}

const StockButton = ({ onSymbolSubmit, symbol }) => {
  const handleClick = (event) => {
    onSymbolSubmit(symbol)
  }

  return (
    <Button size='mini' onClick={handleClick}>View Stock</Button>
  )
}

class Portfolio extends Component {
  constructor (props) {
    super(props)
    const { stocks } = this.props.portfolio
    let tableData
    if (stocks) {
      tableData = this.dataMapper(stocks)
    } else {
      tableData = []
    }
    this.state = {
      column: null,
      data: tableData,
      direction: null
    }
  }

  componentWillReceiveProps (nextProps) {
    const tableData = this.dataMapper(nextProps.portfolio.stocks)

    const { column } = this.state

    this.setState({
      data: sortBy(tableData, column)
    })
  }

  dataMapper = stocks => {
    const { onSymbolSubmit } = this.props
    return stocks.map(stock => {
      const { name, quantity, pricePaid, symbol } = stock
      return {
        name,
        quantity,
        pricePaid,
        btn: <StockButton onSymbolSubmit={onSymbolSubmit} symbol={symbol} />
      }
    })
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending'
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  })
  formatBalance = (balance) => this.formatter.format(balance)

  render () {
    const { column, data, direction } = this.state

    const { balance } = this.props.portfolio

    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              Current Portfolio
              </Grid.Column>
            <Grid.Column textAlign='right'>
              Cash: {this.formatBalance(balance)}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Table sortable fixed>
                <Table.Header>
                  <Table.Row >
                    <Table.HeaderCell style={noBorder} sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
                      Company
                </Table.HeaderCell>
                    <Table.HeaderCell style={noBorder} sorted={column === 'quantity' ? direction : null} onClick={this.handleSort('quantity')}>
                      Quantity
                </Table.HeaderCell>
                    <Table.HeaderCell style={noBorder} sorted={column === 'pricePaid' ? direction : null} onClick={this.handleSort('pricePaid')}>
                      Price Paid
                </Table.HeaderCell>
                    <Table.HeaderCell style={noBorder} />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {map(data, ({ name, pricePaid, quantity, btn }) => (
                    <Table.Row key={name}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{quantity}</Table.Cell>
                      <Table.Cell>{pricePaid}</Table.Cell>
                      <Table.Cell>{btn}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Portfolio
