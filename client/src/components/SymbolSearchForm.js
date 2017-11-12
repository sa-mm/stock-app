import React, { Component } from 'react'
import { Form, Message, Loader } from 'semantic-ui-react'

class SymbolSearchForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      symbol: ''
    }
  }

  handleChange = event => {
    const symbol = event.target.value.toUpperCase()
    this.setState({
      symbol
    })
  }

  handleSubmit = event => {
    const { symbol } = this.state
    this.props.actions.onSymbolSubmit(symbol)
  }

  render () {
    const { symbol } = this.state
    const showWarning = !!this.props.currentStock.yahooError
    let msg = ''
    if (showWarning) {
      msg = this.props.currentStock.yahooError
    }

    const isFetching = this.props.currentStock.isFetching

    return (
      <Form onSubmit={this.handleSubmit} warning={showWarning}>
        <Form.Group>
          <Form.Input
            className='symbol-input'
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
            'Please search for a different symbol.'
          ]}
          size='mini'
        />
      </Form>
    )
  }
}

export default SymbolSearchForm
