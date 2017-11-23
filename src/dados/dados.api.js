import axios from 'axios'

// const URL = 'https://us-central1-akuntsu-168619.cloudfunctions.net/data/'
const URL = 'http://localhost:8010/akuntsu-168619/us-central1/data'


exports.get = function (param) {
	if (param == 'count')
		return axios.get(URL + '?count=true')

	if (param == 'last')
		return axios.get(URL + '?last=true')

	if (param)
		return axios.get(URL + `?groupBy=${param}`)


	// 	return { data: [{ amps: 1, _id: '59dcdcac2db72b0002fc70df' }] }

	// return { data: { amps: 1, _id: '59dcdcac2db72b0002fc70df' } }

	// if (!id)
	// 	return axios.get(URL)

	// return axios.get(URL + id)
}