import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme'
import Stock from './Stock'
import { SellingTooManySharesWarning, PriceTooHighWarning } from './Warnings'

const mock = {
  currentStock: {
    isFetching: false,
    stock: {
      symbol: 'FREDDIE',
      name: 'Not Real',
      bidPrice: 10,
      askPrice: 10
    }
  },
  portfolio: {
    stocks: [],
    balance: 100.00
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Stock {...mock} />, div)
})

it('I can get the internal state', () => {
  const wrapper = shallow(<Stock {...mock} />)
  expect(wrapper.state().dimmerActive).toEqual(true)
})

it('should deactivate dimmer on when new stock is passed to it', () => {
  // And this is why we use redux
  const nextProps = {
    ...mock,
    currentStock: {
      ...mock.currentStock,
      stock: {
        ...mock.currentStock.stock,
        symbol: 'AAPL'
      }
    }
  }
  const wrapper = shallow(<Stock {...mock} />)
  wrapper.setProps(nextProps)

  expect(wrapper.state().dimmerActive).toEqual(false)
})

it('keeps dimmer active if the stock symbol is unchanged', () => {
  // And this is why we use redux
  const nextProps = {
    ...mock,
    currentStock: {
      ...mock.currentStock,
      stock: {
        ...mock.currentStock.stock,
        symbol: 'FREDDIE'
      }
    }
  }
  const wrapper = shallow(<Stock {...mock} />)
  wrapper.setProps(nextProps)

  expect(wrapper.state().dimmerActive).toEqual(true)
})

it('displays a warning message if the price to be paid is greater than the balance', () => {
  const wrapper = mount(<Stock {...mock} />)

  wrapper.find('input').simulate('change', { target: { value: '100' } })
  expect(wrapper.state().quantity).toEqual(100)

  // console.log(wrapper.find('button'))
  wrapper.find('button').at(1).simulate('click')
  // wrapper.find('button').first().simulate('click')
  expect(wrapper.state().priceTooHigh).toEqual(true)
  expect(wrapper.containsMatchingElement(<PriceTooHighWarning />)).toEqual(true)

  expect(wrapper.state().sellingTooMany).toEqual(false)
  expect(wrapper.containsMatchingElement(<SellingTooManySharesWarning />)).toEqual(false)
})

it('displays a warning message if user tries to sell more stocks than exist in portfolio', () => {
  const mockWithStocks = {
    currentStock: {
      isFetching: false,
      stock: {
        symbol: 'FREDDIE',
        name: 'Not Real',
        bidPrice: 10,
        askPrice: 10
      }
    },
    portfolio: {
      stocks: [{
        symbol: 'FREDDIE',
        name: 'Not Real',
        pricePaid: 10,
        quantity: 10
      }],
      balance: 100.00
    }
  }
  const wrapper = mount(<Stock {...mockWithStocks} />)
  wrapper.find('input').simulate('change', { target: { value: '100' } })
  expect(wrapper.state().quantity).toEqual(100)

  const sellBtn = wrapper.find('button').last()
  expect(sellBtn.text()).toEqual('Sell')

  wrapper.find('button').last().simulate('click')
  expect(wrapper.state().priceTooHigh).toEqual(false)
  expect(wrapper.containsMatchingElement(<PriceTooHighWarning />)).toEqual(false)

  expect(wrapper.state().sellingTooMany).toEqual(true)
  expect(wrapper.containsMatchingElement(<SellingTooManySharesWarning />)).toEqual(true)
})

it('has a disabled sell btn if the current stock is not in the portfolio', () => {
  const wrapper = mount(<Stock {...mock} />)
  const sellBtn = wrapper.find('button').last()
  expect(sellBtn.props().disabled).toEqual(true)
})

it('input quantity value will be an empty string if a value is input and then deleted', () => {
  // Placeholder text disappears if quantity is set to 0
  const wrapper = mount(<Stock {...mock} />)
  const input = wrapper.find('input')

  // Check the defaults
  expect(wrapper.state().quantity).toEqual('')
  expect(input.props().value).toEqual('')

  // Simulate input
  input.simulate('change', { target: { value: '100' }})
  expect(wrapper.state().quantity).toEqual(100)
  expect(input.props().value).toEqual(100)

  // Simulate delete
  input.simulate('change', { target: { value: 0 }})
  expect(wrapper.state().quantity).toEqual('')
  expect(input.props().value).toEqual('')

  // Coercion, yay!
})
