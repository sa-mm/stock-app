import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
// import Chart from './Chart'
import { StockHistory } from './StockHistory'

class StockHistoryContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: ['default data']
    }
  }

  handleOpen = () => {
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
        console.log(dates)
        this.setState({
          data: dates
        })
      })
  }

  render() {
    const symbol = this.props.symbol
    // const listItems = this.state.data.map((day, key) => (<li key={key}>{day}</li>))
    return (
      <StockHistory handleOpen={this.handleOpen} symbol={symbol} />
    )
  }
}

export default StockHistoryContainer
