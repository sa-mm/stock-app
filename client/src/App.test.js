import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const initialState = {
  portfolio: {
    balance: 100000,
    stocks: []
  },
  currentStock: {
    isFetching: false,
    stock: { symbol: 'FREDDIE', name: 'Not Real', bidPrice: 161.75, askPrice: 161.78 },
    yahooStock: { symbol: 'FREDDIE', shortName: 'Not Real', bid: 161.75, ask: 161.78 },
    yahooError: '',
    yahooResult: [],
    history: {},
    displayChart: false,
    error: ''
  }
}

const moreProps = {
  onBuyClick: jest.fn(),
  onSellClick: jest.fn(),
  onSymbolSubmit: jest.fn(),
  fetchHistory: jest.fn()
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App {...initialState} {...moreProps} />, div)
})
