import React from 'react'
import ReactDOM from 'react-dom'
import StockHistoryContainer from './StockHistoryContainer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StockHistoryContainer />, div)
})
