import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Header from '../components/Header/Header'

export const PrivateRoute = ({
	isAuthenticated = false,
	component: Component,
	...rest
}) =>
	(
		<Route {...rest} component={props => (
			isAuthenticated ?
				<div>
					<Header />
					<Component {...props} />
				</div> :
				<Redirect to='/' />
		)} />
	)

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
	component: PropTypes.func
}

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.user
})

export default connect(mapStateToProps)(PrivateRoute)