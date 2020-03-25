import {createStore, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'

// const rootReducer = combineReducers ({
//   userReducer,
//   locationReducer
// })

export default createStore(userReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))