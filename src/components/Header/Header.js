import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { history } from '../../routers/Router'
import { logout } from '../../actions/auth'


export class Header extends React.Component {

	state = {
		selectedKeys: [history.location.pathname.slice(1)]
	}

	handleClick = ({ key }) => {
		history.push(`/${key}`)
	}

	render() {
		return (
			<header className='header'>
				<div className='header__logo-links'>
					<img src='/images/logo_duo_ph.svg' />
				</div>
				<div className='header__buttons'>
					<button
						className='button'
						onClick={this.props.logout}>
						<img src='/icons/ic_logout_dg.svg' />
					</button>
				</div>
			</header>
		)
	}
}

Header.propTypes = {
	logout: PropTypes.func
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout())
	}
}

export default connect(undefined, mapDispatchToProps)(Header)
