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

  /* handleOpen = () => {
    const symbol = this.props.symbol

    fetch('/avapi/' + symbol)
      .then(
      response => response.json(),
      error => console.log('An error occured.', error)
      )
      .then(json => {
        // const stock = Object.keys(json).map(k => json[k])[0]
        // if (stock.error) {
        //   dispatch(errorStock(symbol, stock))
        // } else {
        //   dispatch(receiveHistory(symbol, stock))
        // }
        // const stockHistory = json["Time Series (Daily)"]
        // console.log(json['Time Series (Daily)'])
        const dates = Object.keys(json['Time Series (Daily)'])
        // console.log(dates)
        this.setState({
          data: json
        })
      })
  } */

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
