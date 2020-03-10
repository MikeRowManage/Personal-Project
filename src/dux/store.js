import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))