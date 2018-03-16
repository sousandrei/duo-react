import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import auth from '../reducers/auth'
import data from '../reducers/data'
import state from '../reducers/state'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
	const store = createStore(
		combineReducers({
			auth,
			data,
			state
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

	return store
}
