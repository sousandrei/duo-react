const dataReducerDefaultState = {}

export default (
	state = dataReducerDefaultState,
	action
) => {
	switch (action.type) {
		case 'GET_DATA':
			return action.data
		default:
			return state
	}
}
