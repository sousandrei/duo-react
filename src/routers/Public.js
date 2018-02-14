import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
	isAuthenticated = false,
	component: Component,
	...rest
}) =>
	(
		<Route {...rest} component={props => (
			isAuthenticated ?
				<Redirect to='/dashboard' /> :
				<Component {...props} />
		)} />
	)

PublicRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
	component: PropTypes.func
}

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)