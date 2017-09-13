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

export const REQUEST_STOCK = 'REQUEST_STOCK'
export function requestStock (symbol) {
  return {
    type: REQUEST_STOCK,
    symbol
  }
}

export const RECEIVE_STOCK = 'RECEIVE_STOCK'
export function receiveStock (symbol, stock) {
  return {
    type: RECEIVE_STOCK,
    symbol,
    stock
  }
}

export const ERROR_STOCK = 'ERROR_STOCK'
export function errorStock (symbol, stock) {
  return {
    type: ERROR_STOCK,
    symbol,
    stock
  }
}

export const fetchStock = (symbol) => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestStock(symbol))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // Proxy specified in package.json
    // Assumes API server on port 5000
    return fetch('/api/' + symbol)
      .then(
      response => response.json(),
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing an loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => console.log('An error occured.', error)
      )
      .then(json => {
        // We can dispatch many times!
        //     Here, we update the app state with the results of the API call.
        // console.log(json)
        const stock = Object.keys(json).map(k => json[k])[0]
        if (stock.error) {
          dispatch(errorStock(symbol, stock))
        } else {
          dispatch(receiveStock(symbol, stock))
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

// I DON'T WANT THIS YET, I THINK
// export const fetchHistory = symbol => {
//   return function (dispatch) {
//     dispatch(requestHistory(symbol))
//     return fetch('/avapi/' + symbol)
//       .then(
//       response => response.json(),
//       error => console.log('An error occured.', error)
//       )
//       .then(json => {
//         // const stock = Object.keys(json).map(k => json[k])[0]
//         // if (stock.error) {
//         //   dispatch(errorStock(symbol, stock))
//         // } else {
//         //   dispatch(receiveHistory(symbol, stock))
//         // }
//         // const stockHistory = json["Time Series (Daily)"]
//         console.log(json)
//       }
//     )
//   }
// }
