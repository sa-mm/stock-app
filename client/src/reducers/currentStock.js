import {
  REQUEST_HISTORY,
  RECEIVE_HISTORY,
  ERROR_HISTORY,
  REQUEST_YAHOO_STOCK,
  RECEIVE_YAHOO_STOCK,
  REQUEST_IEX_STOCK,
  RECEIVE_IEX_STOCK,
  YAHOO_ERROR,
YAHOO_RESULT } from '../actions'

const initialState = {
  isFetching: false,
  yahooStock: {},
  yahooError: '',
  yahooResult: [],
  history: {},
  displayChart: false,
  stock: {}
}

export const currentStock = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_YAHOO_STOCK:
      return Object.assign({}, state, {isFetching: true}, { yahooError: '' })
    case RECEIVE_YAHOO_STOCK:
      return Object.assign({}, state, { isFetching: false }, { yahooStock: action.stock })
    case REQUEST_IEX_STOCK:
      return Object.assign({}, state)
    case RECEIVE_IEX_STOCK:
      return Object.assign({}, state, { stock: action.stock })
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
