import React from 'react'
import { mount } from 'enzyme'
import SymbolSearchForm from './SymbolSearchForm'

test('SymbolSearchForm updates state after text input', () => {
  // Render a checkbox with label in the document
  const mock = {
    isFetching: false,
    stock: {}
  }
  const component = mount(
    <SymbolSearchForm currentStock={mock} />
  )

  component.setState({
    symbol: 'AAPL'
  })

  expect(component.state('symbol')).toEqual('AAPL')

  component.find('input').simulate('change', { target: { value: 'F' } })

  expect(component.state('symbol')).toEqual('F')
})
