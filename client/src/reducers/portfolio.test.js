import { Reducer } from 'redux-testkit'
import { portfolio } from './portfolio'
import { BUY, SELL } from '../actions'

const initialState = {
  balance: 100000,
  stocks: []
}

describe('reducer/portfolio', () => {
  it('should have initial state', () => {
    expect(portfolio()).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(portfolio).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState)
  })

  it('should buy stock', () => {
    const action = {
      type: BUY,
      symbol: 'F',
      quantity: 10,
      price: 21.50,
      name: 'Ford'
    }
    const newStock = {
      symbol: 'F',
      pricePaid: 21.50,
      quantity: 10,
      name: 'Ford'
    }
    Reducer(portfolio).expect(action).toReturnState({
      ...initialState,
      balance: 100000 - (10 * 21.50),
      stocks: [newStock]
    })
  })

  it('should add quantity to previous held stock when buying more', () => {
    const action = {
      type: BUY,
      symbol: 'F',
      quantity: 10,
      price: 21.50,
      name: 'Ford'
    }

    const oldFord = {
      symbol: 'F',
      pricePaid: 20,
      quantity: 5,
      name: 'Ford'
    }

    const newFord = {
      symbol: 'F',
      pricePaid: 21.50,
      quantity: 15,
      name: 'Ford'
    }

    const previousState = {
      ...initialState,
      stocks: [oldFord]
    }

    const newState = {
      ...previousState,
      balance: 100000 - (10 * 21.50),
      stocks: [newFord]
    }

    Reducer(portfolio)
    .withState(previousState)
    .expect(action)
    .toReturnState(newState)
  })

  it('should sell stock', () => {
    const action = {
      type: SELL,
      symbol: 'F',
      quantity: 2,
      price: 21.50
    }
    const singleStock = {
      symbol: 'F',
      pricePaid: 21.50,
      quantity: 10,
      name: 'Ford'
    }
    const passedState = {
      ...initialState,
      stocks: [singleStock]
    }
    Reducer(portfolio).withState(passedState).expect(action).toReturnState({
      ...passedState,
      balance: 100000 + (2 * 21.50),
      stocks: [{
        ...singleStock,
        quantity: 8
      }]
    })
  })

  it('should remove the stock completely if selling all shares', () => {
    const action = {
      type: SELL,
      symbol: 'F',
      quantity: 10,
      price: 21.50
    }
    const singleStock = {
      symbol: 'F',
      pricePaid: 21.50,
      quantity: 10,
      name: 'Ford'
    }
    const passedState = {
      ...initialState,
      stocks: [singleStock]
    }
    const output = {
      ...passedState,
      balance: 100000 + (10 * 21.50),
      stocks: []
    }
    Reducer(portfolio)
      .withState(passedState)
      .expect(action)
      .toReturnState(output)
  })
})
