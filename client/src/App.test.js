// import _ from 'lodash'
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
    stock: { symbol: 'FREDDIE', name: 'Not Real', bidPrice: 161.75, askPrice: 161.78 }
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App {...initialState} />, div)
})
