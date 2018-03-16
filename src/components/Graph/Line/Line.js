import React from 'react'
import PropTypes from 'prop-types'

import { Line as LineChart } from 'react-chartjs-2'

export const Line = ({
	data = [],
	labels = [],
	color = '#fff'
}) =>
	(
		<div className='line'>
			<LineChart
				data={{
					labels,
					datasets: [{
						data,
						lineTension: 0,
						backgroundColor: 'rgba(0, 0, 0, 0)',
						borderColor: color
					}]
				}}
				options={{
					legend: { display: false },
					responsive: true
				}} />
		</div>
	)

Line.propTypes = {
	data: PropTypes.array,
	labels: PropTypes.array,
	color: PropTypes.string
}


export default Line
