import React from 'react'
import ReactDOM from 'react-dom'
// import { shallow, mount } from 'enzyme'
import Chart from './Chart'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Chart />, div)
})
