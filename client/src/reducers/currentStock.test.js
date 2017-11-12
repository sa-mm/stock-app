import { Reducer } from 'redux-testkit'
import { currentStock } from './currentStock'
import {
  REQUEST_YAHOO_STOCK,
  RECEIVE_YAHOO_STOCK,
  YAHOO_ERROR,
  YAHOO_RESULT } from '../actions'

const initialState = {
  isFetching: false,
  yahooStock: {},
  yahooError: '',
  yahooResult: [],
  history: {},
  displayChart: false
}

describe('reducer/currentStock', () => {
  it('should have initial state', () => {
    expect(currentStock()).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(currentStock).expect({type: 'NOT_EXISTING'}).toReturnState(initialState)
  })

  it('should override isFetching on yahoo request', () => {
    const stock = {
      symbol: 'F'
    }
    const action = {type: REQUEST_YAHOO_STOCK, stock}
    Reducer(currentStock).expect(action).toReturnState({...initialState, isFetching: true})
  })

  it('should store new yahoStock and override isFetching on receive', () => {
    const stock = {
      symbol: 'F'
    }
    const receivedState = {
      ...initialState,
      isFetching: true
    }
    const action = {type: RECEIVE_YAHOO_STOCK, stock}
    Reducer(currentStock).expect(action).toReturnState({
      ...receivedState,
      isFetching: false,
      yahooStock: stock
    })
  })

  it('should store new error message in yahooError and override isFetching on error', () => {
    const symbol = 'APPLE'
    const error = 'This is an error message'
    const receivedState = {
      ...initialState,
      isFetching: true
    }
    const action = { type: YAHOO_ERROR, symbol, error }
    Reducer(currentStock).expect(action).toReturnState({
      ...receivedState,
      isFetching: false,
      yahooError: error
    })
  })

  it('should store the result from yahoo as an array', () => {
    const symbol = 'AAPL'
    const result = ['hi']
    const receivedState = {
      ...initialState
    }
    const action = { type: YAHOO_RESULT, symbol, result }
    Reducer(currentStock).expect(action).toReturnState({
      ...receivedState,
      yahooResult: result
    })
  })
})
