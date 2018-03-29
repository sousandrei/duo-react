const defaultState = {
	graph: false,
	select: 'day'
}

export default (
	state = defaultState,
	action
) => {
	switch (action.type) {
		case 'SET_STATE':
			return { ...state, ...action.state }
		default:
			return state
	}
}	
