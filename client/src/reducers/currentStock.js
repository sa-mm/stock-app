import { RECEIVE_STOCK, REQUEST_STOCK, ERROR_STOCK } from '../actions'

export const currentStock = (state = { isFetching: false, stock: {} }, action = {}) => {
  switch (action.type) {
    case RECEIVE_STOCK:
      return Object.assign({}, state, {isFetching: false}, {stock: action.stock})
    case REQUEST_STOCK:
      return Object.assign({}, state, {isFetching: true})
    case ERROR_STOCK:
      return Object.assign({}, state, {isFetching: false}, {stock: action.stock})
    default:
      return state
  }
}
