import React, { Component } from 'react'
import { StockHistory } from './StockHistory'

class StockHistoryContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.symbol !== this.props.symbol) {
      this.props.fetchHistory(nextProps.symbol)
    }
  }

  render () {
    const { displayChart, history, symbol } = this.props
    return (
      <StockHistory symbol={symbol} displayChart={displayChart} data={history} />
    )
  }
}

export default StockHistoryContainer
