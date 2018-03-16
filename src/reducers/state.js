const defaultState = {
	graph: false,
	select: 'dia'
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
