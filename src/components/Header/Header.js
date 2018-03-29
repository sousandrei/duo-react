import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { history } from '../../routers/Router'
import { logout } from '../../actions/auth'
import { setState } from '../../actions/state'

import {
	amarelo
} from '../../styles/base/_settings.scss'


export class Header extends React.Component {

	state = {
		selectedKeys: [history.location.pathname.slice(1)]
	}

	handleClick = ({ key }) => {
		history.push(`/${key}`)
	}

	handleGraphClick = () => {
		this.props.setState({ graph: !this.props.state.graph })
	}

	handleSelectClick = value => {
		this.props.setState({ select: value })
	}

	render() {

		const {
			graph,
			select
		} = this.props.state

		return (
			<header className='header'>
				<div className='header__logo-links'>
					<button>
						<img src='/images/logo_duo_ph.svg' />
					</button>
					<hr />
					<button onClick={this.handleGraphClick}>
						{graph ?
							<img src='/icons/ic_graficos_yl.svg' /> :
							<img src='/icons/ic_graficos_dg.svg' />}
					</button>
					{graph && <button
						onClick={() => this.handleSelectClick('day')}>
						<span style={select == 'day' ?
							{ color: amarelo } : {}}>
							Dia
						</span>
					</button>}
					{graph && <button
						onClick={() => this.handleSelectClick('week')}>
						<span style={select == 'week' ?
							{ color: amarelo } : {}}>
							Semana
						</span>
					</button>}
					{graph && <button
						onClick={() => this.handleSelectClick('month')}>
						<span style={select == 'month' ?
							{ color: amarelo } : {}}>
							Mes
						</span>
					</button>}
					{graph && <button
						onClick={() => this.handleSelectClick('semester')}>
						<span style={select == 'semester' ?
							{ color: amarelo } : {}}>
							Semestre
						</span>
					</button>}
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
	state: PropTypes.object,
	logout: PropTypes.func,
	setState: PropTypes.func,
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
		setState: state => dispatch(setState(state))
	}
}

const mapStateToProps = state => ({
	state: state.state
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
