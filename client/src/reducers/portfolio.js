import { BUY, SELL } from '../actions'

const buyStock = (state, action) => {
  const { symbol, price, quantity, name } = action
  const newStock = { symbol, pricePaid: price, quantity, name }
  const alreadyOwnsStock = state ? state.stocks.some(stock => stock.symbol === symbol) : ''
  let updatedStocks
  if (alreadyOwnsStock) {
    // add update the quantity
    const idx = state.stocks.findIndex(stock => stock.symbol === symbol)
    const oldStock = state.stocks[idx]
    updatedStocks = [
      ...state.stocks.slice(0, idx),
      Object.assign({}, newStock, { quantity: oldStock.quantity + quantity }),
      ...state.stocks.slice(1 + idx)
    ]
    // should the "Price Paid" be the last price paid?
    // if so, then newStock should be the second argument passed
    // to Object.assign
  } else {
    updatedStocks = state.stocks.concat(newStock)
  }
  const updatedBalance = state.balance - (price * quantity)
  return Object.assign({}, state, { stocks: updatedStocks }, { balance: updatedBalance })
}

const sellStock = (state, action) => {
  const { symbol, price, quantity } = action
  const idx = state.stocks.findIndex(stock => stock.symbol === symbol)
  const theStock = state.stocks[idx]

  const newQuantity = theStock.quantity - quantity
  let updatedStocks
  if (newQuantity > 0) {
    const updatedStock = Object.assign({}, theStock, { quantity: newQuantity })
    updatedStocks = [
      ...state.stocks.slice(0, idx),
      updatedStock,
      ...state.stocks.slice(idx + 1)
    ]
  } else {
    updatedStocks = [
      ...state.stocks.slice(0, idx),
      ...state.stocks.slice(idx + 1)
    ]
  }
  // console.log(updatedStocks)
  const updatedBalance = state.balance + (price * quantity)
  return {
    ...state,
    balance: updatedBalance,
    stocks: updatedStocks
  }
}

const initialState = {
  balance: 100000,
  stocks: []
}

export const portfolio = (state = initialState, action = {}) => {
  switch (action.type) {
    case BUY:
      return buyStock(state, action)
    case SELL:
      return sellStock(state, action)
    default:
      return state
  }
}
