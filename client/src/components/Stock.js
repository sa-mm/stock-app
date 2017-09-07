import React, { Component } from 'react'
import { Table, Form, Grid, Dimmer, Header } from 'semantic-ui-react'
import { PriceTooHighWarning, SellingTooManySharesWarning } from './Warnings'

class Stock extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      quantity: '',
      showWarning: false,
      priceTooHigh: false,
      sellingTooMany: false,
      warningColor: '',
      active: false
    }

    this.initialState = Object.assign({}, this.defaultState, { active: true })

    this.state = { ...this.initialState }
  }

  componentWillReceiveProps(nextProps) {
    const nextSymbol = nextProps.currentStock.stock.symbol
    const symbol = this.props.currentStock.stock.symbol
    console.log('componentWillReceiveProps is being called')

    // If a new symbol is passed to the compoennt,
    // then the state should be reset:
    // no warnings, no assumptions about quantity
    if (nextSymbol !== symbol) {
      this.resetState()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextError = nextProps.currentStock.stock.error
    if (nextError) return false
    return true
  }

  resetState = () => {
    this.setState(this.defaultState)
  }

  handleChange = event => {
    const value = event.target.value

    this.setState({
      quantity: value > 0 ? +value : '',
      priceTooHigh: false,
      sellingTooMany: false
    })

    event.preventDefault()
  }

  handleBuySubmit = event => {
    const { askPrice } = this.props.currentStock.stock
    const { balance } = this.props.portfolio

    const isTooHigh = askPrice * this.state.quantity > balance

    if (isTooHigh) {
      this.setState({
        warningColor: 'red',
        priceTooHigh: true,
        sellingTooMany: false
      })
    } else {
      // do something with redux
      const { quantity } = this.state
      const { symbol, name, askPrice } = this.props.currentStock.stock

      this.props.actions.onBuyClick({ symbol, price: askPrice, quantity, name })

      //reset internal state of component
      this.resetState()

    }
  }

  handleSellSubmit = event => {
    const { quantity } = this.state
    const { symbol, bidPrice } = this.props.currentStock.stock
    const { stocks } = this.props.portfolio

    const idx = stocks.findIndex(stock => stock.symbol === symbol)
    const theStock = stocks[idx]

    const isSellingTooMany = theStock.quantity < quantity

    if (isSellingTooMany) {
      this.setState({
        sellingTooMany: true,
        priceTooHigh: false,
        warningColor: 'red'
      })
    } else {
      // do something with redux
      this.props.actions.onSellClick({ symbol, price: bidPrice, quantity })

      //reset internal state of component
      this.resetState()
    }
  }

  render() {
    const { quantity } = this.state
    const stock = this.props.currentStock.stock
    const { symbol, name, bidPrice, askPrice } = stock
    const { stocks } = this.props.portfolio
    const ownsStock = stocks ? stocks.some(e => e.symbol === symbol) : false
    const { active } = this.state

    return (
      <Grid>
        <Dimmer.Dimmable as={Grid} dimmed={active}>
          <Dimmer active={active} inverted>
            <Header color='black'>
              Lookup a stock!
          </Header>
          </Dimmer>
          <Grid.Row>
            <Grid.Column>
              <p>{name} ({symbol})</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign='center'>Bid</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Ask</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell textAlign='center'>{bidPrice}</Table.Cell>
                    <Table.Cell textAlign='center'>{askPrice}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Form>
                <Form.Group>
                  <Form.Input
                    placeholder='Quantity'
                    value={quantity}
                    onChange={this.handleChange}
                  />
                  <Form.Button
                    content='Buy'
                    onClick={this.handleBuySubmit}
                  />
                  <Form.Button
                    content='Sell'
                    onClick={this.handleSellSubmit}
                    disabled={!ownsStock}
                  />
                </Form.Group>
                {this.state.priceTooHigh ? <PriceTooHighWarning color={this.state.warningColor} /> : ''}
                {this.state.sellingTooMany ? <SellingTooManySharesWarning color={this.state.warningColor} /> : ''}
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Dimmer.Dimmable>
      </Grid>
    )
  }
}

export default Stock
