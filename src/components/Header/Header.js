import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { history } from '../../routers/Router'
import { logout } from '../../actions/auth'
import { setState } from '../../actions/state'


export class Header extends React.Component {

	state = {
		selectedKeys: [history.location.pathname.slice(1)]
	}

	handleClick = ({ key }) => {
		history.push(`/${key}`)
	}

	handleGraphClick = () => {
		this.props.setState({ graph: !this.props.graph })
	}

	handleSelectClick = value => {
		this.props.setState({ select: value })
	}

	render() {
		return (
			<header className='header'>
				<div className='header__logo-links'>
					<button>
						<img src='/images/logo_duo_ph.svg' />
					</button>
					<hr />
					<button onClick={this.handleGraphClick}>
						<img src='/icons/ic_graficos_dg.svg' />
					</button>
					<button onClick={() => this.handleSelectClick('day')}>
						Dia
					</button>
					<button onClick={() => this.handleSelectClick('week')}>
						Semana
					</button>
					<button onClick={() => this.handleSelectClick('month')}>
						Mes
					</button>
					<button onClick={() => this.handleSelectClick('semester')}>
						Semestre
					</button>
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
	graph: PropTypes.bool,
	logout: PropTypes.func,
	setState: PropTypes.func,
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
		setState: state => dispatch(setState(state))
	}
}

const mapStateToProps = (state, props) => ({
	graph: state.state.graph
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
