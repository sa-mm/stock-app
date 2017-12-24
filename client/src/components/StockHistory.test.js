import React from 'react'
import ReactDOM from 'react-dom'
import { StockHistory } from './StockHistory'
import Chart from './Chart'
import { Modal } from 'semantic-ui-react'
import { shallow } from 'enzyme'

const mockProps = {
  handleOpen: jest.fn(),
  displayChart: false,
  data: {},
  symbol: ''
}
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StockHistory {...mockProps} />, div)
})

describe('StockHistory', () => {
  it('displays the chart', () => {
    const component = shallow(<StockHistory {...mockProps} />)
    const modal = component.find(Modal)
    const chart = component.find(Chart)

    expect(chart.exists()).toBe(false)

    component.setProps({
      displayChart: true
    })

    expect(component.find(Chart).exists()).toBe(true)
  })
})
