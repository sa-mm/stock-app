import {
  RECEIVE_STOCK,
  REQUEST_STOCK,
  ERROR_STOCK,
  REQUEST_HISTORY,
  RECEIVE_HISTORY,
  ERROR_HISTORY,
  REQUEST_YAHOO_STOCK,
  RECEIVE_YAHOO_STOCK,
  YAHOO_ERROR,
YAHOO_RESULT } from '../actions'

const initialState = {
  isFetching: false,
  stock: {},
  yahooStock: {},
  yahooError: '',
  yahooResult: [],
  history: {},
  displayChart: false,
  error: ''
}

export const currentStock = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_STOCK:
      return Object.assign({}, state, { isFetching: false }, { stock: action.stock })
    case REQUEST_STOCK:
      return Object.assign({}, state, { isFetching: true })
    case ERROR_STOCK:
      return Object.assign({}, state, { isFetching: false }, { stock: action.stock })
    case REQUEST_YAHOO_STOCK:
      return Object.assign({}, state, {isFetching: true}, { yahooError: '' })
    case RECEIVE_YAHOO_STOCK:
      return Object.assign({}, state, { isFetching: false }, { yahooStock: action.stock })
    case YAHOO_ERROR:
      return {
        ...state,
        isFetching: false,
        yahooError: action.error
      }
    case YAHOO_RESULT:
      return {
        ...state,
        yahooResult: action.result
      }
    case REQUEST_HISTORY:
      return Object.assign({}, state, { displayChart: false })
    case RECEIVE_HISTORY:
      return Object.assign({}, state, { displayChart: true }, { history: action.history })
    case ERROR_HISTORY:
      return Object.assign({}, state, { displayChart: false }, { error: action.error })
    default:
      return state
  }
}
