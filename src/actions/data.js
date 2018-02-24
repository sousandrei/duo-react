import axios from 'axios'

const DASHBOARD = process.env.DASHBOARD

export const getDataAction = data => ({
	type: 'GET_DATA',
	data
})

export const getData = () => {
	return async dispatch => {
		try {
			let result = await axios.get(DASHBOARD)
			dispatch(getDataAction(result.data))
		} catch (err) {
			console.error('could not retrieve data')
		}
	}
}
