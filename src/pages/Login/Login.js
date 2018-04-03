import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { login } from '../../actions/auth'

import Loading from '../Loading/Loading'

const version = process.env.VERSION

export class Login extends React.Component {

	state = {
		error: '',
		username: '',
		password: '',
		focused: false,
		loading: false
	}

	handleFocus = () => {
		this.setState({ focused: true })
	}

	handleBlur = () => {
		this.setState({ focused: false })
	}

	handleLogin = async e => {
		e.preventDefault()

		let password = this.state.password
		let username = this.state.username

		this.setState({ loading: true })

		try {
			await this.props.login({ username, password })
		} catch (error) {
			this.setState({ error: error.toString(), loading: false })

			// todo tratar o tipo de erro de login
			setTimeout(() => {
				this.setState({ error: '' })
			}, 3000)
		}

	}

	handleusernameChange = e => {
		let username = e.target.value.toUpperCase()

		this.setState(() => ({ username }))
	}

	handlepasswordChange = e => {
		const passError = 'senha invalida'
		let password = e.target.value
		let error = this.state.error

		password.length <= 3 ?
			error ? null : error = 'senha invalida' :
			error == passError ? error = '' : null

		password.length < 1 ?
			error = '' : null

		this.setState(() => ({ password, error }))
	}

	render() {
		return (
			<div className='login'>
				<div
					className={this.state.focused ?
						'login__logo login__logo--back' :
						'login__logo'}>

					<img src='/images/logo_duo_ph.svg' />
				</div>
				<div className={this.state.focused ?
					'login__form login__form--front' :
					'login__form'}>
					{this.state.loading ?
						<Loading /> :
						<form
							onSubmit={this.handleLogin}>
							<input
								onFocus={this.handleFocus}
								onBlur={this.handleBlur}
								placeholder='matrícula'
								onChange={this.handleusernameChange}
								value={this.state.username}
								type='text'
								name='username' />
							<input
								onFocus={this.handleFocus}
								onBlur={this.handleBlur}
								placeholder='password'
								onChange={this.handlepasswordChange}
								value={this.state.password}
								maxLength='32'
								type='password'
								name='password' />
							<button
								disabled={this.state.loading ||
									this.state.error.length > 1 ||
									this.state.username.length < 6 ||
									this.state.password.length < 3}>
								<span>ENTRAR</span>
							</button>
							{this.state.error &&
								<p>{this.state.error}</p>}
						</form>
					}
				</div>
				<span className='version-tag'>{version}</span>
			</div>
		)
	}
}

Login.propTypes = {
	login: PropTypes.func,
}


const mapDispatchToProps = dispatch => {
	return {
		login: obj => dispatch(login(obj))
	}
}

export default connect(undefined, mapDispatchToProps)(Login)
