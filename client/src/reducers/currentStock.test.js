import { Reducer } from 'redux-testkit'
import { currentStock } from './currentStock'
import { RECEIVE_STOCK, REQUEST_STOCK, ERROR_STOCK } from '../actions'

const initialState = {
  isFetching: false,
  stock: {}
}

describe('reducer/currentStock', () => {
  it('should have initial state', () => {
    expect(currentStock()).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(currentStock).expect({type: 'NOT_EXISTING'}).toReturnState(initialState)
  })

  it('should override isFetching on request', () => {
    const stock = {
      symbol: 'F'
    }
    const action = {type: REQUEST_STOCK, stock}
    Reducer(currentStock).expect(action).toReturnState({...initialState, isFetching: true})
  })

  it('should store new stock and override isFetching on receive', () => {
    const stock = {
      symbol: 'F'
    }
    const receivedState = {
      ...initialState,
      isFetching: true
    }
    const action = {type: RECEIVE_STOCK, stock}
    Reducer(currentStock).expect(action).toReturnState({
      ...receivedState,
      isFetching: false,
      stock
    })
  })

  it('should store new stock w/ error and override isFetching on error', () => {
    const stock = {
      error: {
        message: 'This is an error message received via JSON'
      }
    }
    const receivedState = {
      ...initialState,
      isFetching: true
    }
    const action = {type: ERROR_STOCK, stock}
    Reducer(currentStock).expect(action).toReturnState({
      ...receivedState,
      isFetching: false,
      stock
    })
  })

  xit('should store fetched topics and override existing topics', () => {
    const existingState = Immutable({...initialState, topicsByUrl: {url3: 'topic3'}})
    const topicsByUrl = {url1: 'topic1', url2: 'topic2'}
    const action = {type: actionTypes.TOPICS_FETCHED, topicsByUrl}
    Reducer(uut).withState(existingState).expect(action).toReturnState({...initialState, topicsByUrl})
  })
})
