import React, { Component } from 'react'
import { Form, Message, Loader } from 'semantic-ui-react'

class SymbolSearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      symbol: '' 
    }
  }

  handleChange = event => {
    this.setState({ 
      symbol: event.target.value 
    })
  }

  handleSubmit = event => {
    const { symbol } = this.state
    // console.log(symbol)
    this.props.actions.onSymbolSubmit(symbol)
  }

  render() {
    const { symbol } = this.state
    const showWarning = this.props.currentStock.stock.error ? true : false
    let msg = ''
    if (showWarning) {
      // console.log(this.props.currentStock.stock.error)
      // console.log(this.props.currentStock.stock.error.message)
      msg = this.props.currentStock.stock.error.message
    }

    const isFetching = this.props.currentStock.isFetching

    return (
      <Form onSubmit={this.handleSubmit} warning={showWarning}>
        <Form.Group>
          <Form.Input
            placeholder='Enter Symbol'
            value={symbol}
            onChange={this.handleChange}
          />
          <Form.Button content='Lookup' />
          <Loader active={isFetching} size='small' />
        </Form.Group>
        <Message
            warning
            header={msg}
            list={[
              'Please search for a different symbol.',
            ]}
            size='mini'
          />
      </Form>
    )
  }
}

export default SymbolSearchForm
