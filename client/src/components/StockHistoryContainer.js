import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { StockHistory } from './StockHistory'

class StockHistoryContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: ['default data'],
      displayChart: false
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.symbol !== this.props.symbol) {
      // Needs error handling!!!
      this.setState({
        displayChart: false
      })
      const res = await fetch('/avapi/' + nextProps.symbol)
      const json = await res.json()
      this.setState({
        data: json,
        displayChart: true
      })
    }
  }

  render () {
    const symbol = this.props.symbol
    return (
      <StockHistory symbol={symbol} displayChart={this.state.displayChart} data={this.state.data} />
    )
  }
}

export default StockHistoryContainer
