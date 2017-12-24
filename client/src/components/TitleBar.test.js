import React from 'react'
import ReactDOM from 'react-dom'
import TitleBar from './TitleBar'

const props = {
  onSymbolSubmit: () => {},
  currentStock: {}
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TitleBar {...props} />, div)
})
