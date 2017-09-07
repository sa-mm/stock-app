import { combineReducers } from 'redux'
import { portfolio } from './portfolio'
import { currentStock } from './currentStock'

export default combineReducers({
  currentStock,
  portfolio
})
