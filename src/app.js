import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'


import Router, { history } from './routers/Router'
import configureStore from './store/configureStore'

import Loading from './pages/Loading/Loading'

import { loginAction } from './actions/auth'

import 'normalize.css/normalize.css'
import 'animate.css/animate.min.css'
import 'rc-menu/assets/index.css'
import './styles/styles.scss'


axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

const store = configureStore()
const app = document.getElementById('app')

store.subscribe(() => {
	console.log(store.getState())
})

const jsx = (
	<Provider store={store}>
		<Router />
	</Provider>
)

ReactDOM.render(<Loading />, app)

let hasRendered = false
const renderApp = () => {
	if (hasRendered)
		return

	ReactDOM.render(jsx, app)
	hasRendered = true
}

function checkLogin() {
	let user = localStorage.getItem('sirin')

	if (user)
		try {
			user = JSON.parse(user)
			store.dispatch(loginAction(user))

			if (history.location.pathname == '/login' ||
				history.location.pathname == '/')
				history.push('/dashboard')

		} catch (e) {
			console.log(e)
			localStorage.removeItem('sirin')
		}


	renderApp()
}

checkLogin()
