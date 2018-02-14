export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('sirin', JSON.stringify(action.user))
			return { user: action.user }
		case 'LOGOUT':
			localStorage.removeItem('sirin')
			return {}
		default:
			return state
	}
}	