import React from 'react'
import ReactDOM from 'react-dom'
import StockHistoryContainer from './StockHistoryContainer'
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StockHistoryContainer />, div)
})

describe('componentWillReceiveProps()', () => {
  it('call fetchHistory', () => {
    const mockProps = {
      fetchHistory: jest.fn(),
      displayChart: false,
      history: {},
      symbol: 'F'
    }
    const component = mount(<StockHistoryContainer {...mockProps} />)
    const newSymbol = 'AAPL'
    component.setProps({
      symbol: newSymbol
    })
    expect(component.props().fetchHistory).toHaveBeenCalledWith(newSymbol)
  })
})
