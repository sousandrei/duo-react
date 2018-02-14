import { history } from '../routers/Router'
// import { get } from 'axios'

// const ENDPOINT = process.env.ENDPOINT


export const loginAction = (user) => ({
	type: 'LOGIN',
	user
})

export const login = (obj = {
	matricula: '',
	password: ''
}) => {
	return dispatch => {
		return new Promise((resolve, reject) => {

			//todo request
			let user = { ...obj, nome: 'Test' }

			//error
			// return reject('erro no login')

			//sucess
			history.push('/dashboard')
			resolve()

			dispatch(loginAction(user))

		})
	}
}

export const logoutAction = () => ({
	type: 'LOGOUT'
})

export const logout = () => {
	return dispatch => {
		dispatch(logoutAction())
		history.push('/')
	}
}
