import React from 'react'

import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Public from './Public'
import Private from './Private'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import Dashboard from '../pages/Dashboard/Dashboard'

export const history = createBrowserHistory()

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Public path='/' component={Login} exact={true} />
				<Private path='/dashboard' component={Dashboard} />
				<Route path="*" component={NotFound} />
			</Switch>
		</div>
	</Router>
)

export default AppRouter
