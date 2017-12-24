import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

StockHistoryContainer.propTypes = {
  fetchHistory: PropTypes.func.isRequired,
  displayChart: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  symbol: PropTypes.string.isRequired
}

export default StockHistoryContainer
