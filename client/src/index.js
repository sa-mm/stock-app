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
import { buyStock, sellStock, fetchHistory, fetchYahooStock } from './actions'

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
    yahooStock: { symbol: 'FREDDIE', shortName: 'Not Real', bid: 161.75, ask: 161.78 },
    yahooError: '',
    yahooResult: [],
    history: {},
    displayChart: false
  }
}

const store = createPersistentStore(
  reducer,
  initialState
)

const mapStateToProps = (state) => {
  return {
    // stocks: state.portfolio.stocks,
    // balance: state.portfolio.balance,
    portfolio: state.portfolio,
    currentStock: state.currentStock
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBuyClick: (bid) => dispatch(buyStock(bid)),
    onSellClick: (sale) => dispatch(sellStock(sale)),
    onSymbolSubmit: (symbol) => dispatch(fetchYahooStock(symbol)),
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
