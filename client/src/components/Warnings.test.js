import React from 'react'
import ReactDOM from 'react-dom'
import { SellingTooManySharesWarning, PriceTooHighWarning } from './Warnings'

const props = {
  color: 'red'
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SellingTooManySharesWarning {...props} />, div)
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PriceTooHighWarning {...props} />, div)
})
