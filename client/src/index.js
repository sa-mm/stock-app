import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'

// State related
import { compose, createStore, applyMiddleware } from 'redux' // state management
import { Provider, connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk' // for async actions
import persistState from 'redux-sessionstorage' // persist state through session
import reducer from './reducers/index'
import { buyStock, sellStock, fetchStock, fetchHistory, fetchYahooStock } from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const config = {
  key: 'awesomestockapp'
}

const paths = ['portfolio']

const createPersistentStore = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  persistState(paths, config)
)(createStore)

const initialState = {
  portfolio: {
    balance: 100000,
    stocks: []
  },
  currentStock: {
    isFetching: false,
    stock: { symbol: 'FREDDIE', name: 'Not Real', bidPrice: 161.75, askPrice: 161.78 },
    yahooStock: {},
    yahooError: '',
    yahooResult: [],
    history: {},
    displayChart: false,
    error: ''
  }
}

const store = createPersistentStore(
  reducer,
  initialState
)

const mapStateToProps = (state) => {
  return {
    stocks: state.portfolio.stocks,
    balance: state.portfolio.balance,
    currentStock: state.currentStock
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBuyClick: (bid) => dispatch(buyStock(bid)),
    onSellClick: (sale) => dispatch(sellStock(sale)),
    onSymbolSubmit: (symbol) => {
      dispatch(fetchStock(symbol))
      dispatch(fetchYahooStock(symbol))
    },
    fetchHistory: (symbol) => dispatch(fetchHistory(symbol))
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
