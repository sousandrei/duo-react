import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { login } from '../../actions/auth'

import Loading from '../Loading/Loading'

export class Login extends React.Component {

	state = {
		error: '',
		username: '',
		senha: '',
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

		let senha = this.state.senha
		let username = this.state.username

		this.setState({ loading: true })

		try {
			await this.props.login({ username, senha })
		} catch (error) /* istanbul ignore next*/ {
			this.setState({ error: error.toString(), loading: false })

			// todo tratar o tipo de erro de login
			setTimeout(() => {
				this.setState({ error: '' })
			}, 3000)
		}

	}

	handleUsernameChange = e => {
		const error = 'username muito curto'
		let username = e.target.value

		username.length >= 6 ?
			this.setState(() => ({ error: '' })) :
			this.setState(() => ({ error }))

		this.setState(() => ({ username }))
	}

	handleSenhaChange = e => {
		const passError = 'Senha invalida'
		let senha = e.target.value
		let error = this.state.error

		senha.length <= 3 ?
			error ? null : error = 'Senha invalida' :
			error == passError ? error = '' : null

		senha.length < 1 ?
			error = '' : null

		this.setState(() => ({ senha, error }))
	}

	render() {
		return (
			<div className='login'>
				{this.state.loading ?
					<Loading /> :
					<form
						onSubmit={this.handleLogin}>
						<input
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							placeholder='username'
							onChange={this.handleUsernameChange}
							value={this.state.username}
							type='text'
							name='username' />
						<input
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							placeholder='senha'
							onChange={this.handleSenhaChange}
							value={this.state.senha}
							type='password'
							name='senha' />
						<button
							disabled={this.state.loading ||
								this.state.error.length > 1 ||
								this.state.username.length < 6 ||
								this.state.senha.length < 3}>
							<span>ENTRAR</span>
						</button>
						{this.state.error &&
							<p>{this.state.error}</p>}
					</form>
				}
			</div >
		)
	}
}

Login.propTypes = {
	login: PropTypes.func,
}


const mapDispatchToProps = dispatch => {
	return {
		login: () => dispatch(login())
	}
}

export default connect(undefined, mapDispatchToProps)(Login)
