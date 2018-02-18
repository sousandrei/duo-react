import axios from 'axios'

const DASHBOARD = process.env.DASHBOARD

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'


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
