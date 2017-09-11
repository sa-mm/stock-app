import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import Portfolio from './Portfolio.js'

const apple = {
  symbol: 'AAPL',
  quantity: 10,
  pricePaid: 120,
  name: 'Apple'
}

const ford = {
  symbol: 'F',
  quantity: 10,
  pricePaid: 21.50,
  name: 'Ford'
}

const ge = {
  symbol: 'GE',
  quantity: 20,
  pricePaid: 11,
  name: 'General Electric'
}

const mock = {
  portfolio: {
    balance: 100000,
    stocks: [ford]
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Portfolio {...mock} />, div)
})

describe('components/Portfolio', () => {
  it('renders a table with one row', () => {
    const wrapper = mount(<Portfolio {...mock} />)
    const tableBody = wrapper.find('tbody')
    // console.log(tableBody.children().at(0).key())
    expect(tableBody.children().length).toEqual(1)
    expect(tableBody.children().at(0).key()).toEqual('Ford')
  })

  it('renders a table with more than one row in order of concatenation', () => {
    const wrapper = mount(<Portfolio {...mock} />)
    const tableBody = wrapper.find('tbody')

    wrapper.setProps({
      portfolio: {
        ...mock.portfolio,
        stocks: mock.portfolio.stocks.concat(apple)
      }
    })
    expect(tableBody.children().length).toEqual(2)
    expect(tableBody.children().at(1).key()).toEqual('Apple')
  })

  it('render a table that can be sorted', () => {
    const wrapper = mount(<Portfolio {...mock} />)
    const tableBody = wrapper.find('tbody')

    // Add apple stock to end of portfolio
    wrapper.setProps({
      portfolio: {
        ...mock.portfolio,
        stocks: mock.portfolio.stocks.concat(apple)
      }
    })
    expect(tableBody.children().at(1).key()).toEqual('Apple')

    const tableHeaders = wrapper.find('th')
    // console.log(tableHeaders.first().text())

    // Sort table by company name
    tableHeaders.first().simulate('click')
    expect(tableBody.children().at(1).key()).toEqual('Ford')
  })

  it('renders a table that stays sorted after new props', () => {
    const wrapper = mount(<Portfolio {...mock} />)
    const tableBody = wrapper.find('tbody')

    // Add apple stock to end of portfolio
    const nextPortfolio = {
      portfolio: {
        ...mock.portfolio,
        stocks: mock.portfolio.stocks.concat(apple)
      }
    }
    wrapper.setProps(nextPortfolio)
    expect(tableBody.children().at(1).key()).toEqual('Apple')

    const tableHeaders = wrapper.find('th')
    // console.log(tableHeaders.first().text())

    // Sort table by company name
    tableHeaders.first().simulate('click')
    expect(tableBody.children().at(1).key()).toEqual('Ford')

    wrapper.setProps({
      portfolio: {
        ...nextPortfolio.portfolio,
        stocks: nextPortfolio.portfolio.stocks.concat(ge)
      }
    })

    // Apple should still be at index 0
    expect(tableBody.children().at(0).key()).toEqual('Apple')
  })
})
