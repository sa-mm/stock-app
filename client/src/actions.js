import fetch from 'isomorphic-fetch'

export const BUY = 'BUY'
export const buyStock = (bid) => {
  const { symbol, price, quantity, name } = bid
  return {
    type: BUY,
    symbol,
    price,
    quantity,
    name
  }
}

export const SELL = 'SELL'
export const sellStock = (sale) => {
  const { symbol, price, quantity } = sale
  return {
    type: SELL,
    symbol,
    price,
    quantity
  }
}

export const REQUEST_YAHOO_STOCK = 'REQUEST_YAHOO_STOCK'
export const requestYahooStock = (symbol) => {
  return {
    type: REQUEST_YAHOO_STOCK,
    symbol
  }
}

export const RECEIVE_YAHOO_STOCK = 'RECEIVE_YAHOO_STOCK'
export const receiveYahooStock = (symbol, stock) => {
  return {
    type: RECEIVE_YAHOO_STOCK,
    symbol,
    stock
  }
}

export const YAHOO_ERROR = 'YAHOO_ERROR'
export const yahooError = (symbol, error) => {
  return {
    type: YAHOO_ERROR,
    symbol,
    error
  }
}

export const YAHOO_RESULT = 'YAHOO_RESULT'
export const yahooResult = (symbol, result) => {
  return {
    type: YAHOO_RESULT,
    symbol,
    result
  }
}

export const fetchYahooStock = (symbol) => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return (dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestYahooStock(symbol))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // Proxy specified in package.json
    // Assumes API server on port 5000
    return fetch('/yahoo/' + symbol)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log(error)
      )
      .then(json => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        if (json.error) {
          dispatch(yahooError(symbol, json.error))
        } else {
          dispatch(yahooResult(symbol, json.quoteResponse.result))
          const stock = json.quoteResponse.result[0]
          dispatch(receiveYahooStock(symbol, stock))
        }
      })
  }
}

export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export function requestHistory (symbol) {
  return {
    type: REQUEST_HISTORY,
    symbol
  }
}

export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'
export const receiveHistory = (symbol, history) => {
  return {
    type: RECEIVE_HISTORY,
    symbol,
    history
  }
}

export const ERROR_HISTORY = 'ERROR_HISTORY'
export function errorHistory (symbol, error) {
  return {
    type: ERROR_HISTORY,
    symbol,
    error
  }
}

export const fetchHistory = symbol => {
  return (dispatch) => {
    dispatch(requestHistory(symbol))
    return fetch('/avapi/' + symbol)
      .then(
      response => response.json(),
      error => dispatch(errorHistory(symbol, error))
      )
      .then(json => {
        dispatch(receiveHistory(symbol, json))
      })
  }
}
