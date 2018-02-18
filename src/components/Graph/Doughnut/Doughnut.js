import React from 'react'
import PropTypes from 'prop-types'

import { Doughnut as DoughnutChart } from 'react-chartjs-2'

export const Doughnut = ({
	min = 50,
	max = 50,
	minLabel = 'min',
	maxLabel = 'max',
}) =>
	(
		<div className='doughnut'>
			<div className='doughnut__legend'>
				<div>
					<hr />
					<span>{minLabel}</span>
				</div>
				<div>
					<hr />
					<span>{maxLabel}</span>
				</div>
			</div>
			<DoughnutChart
				data={{
					datasets: [{
						data: [min, max],
						backgroundColor: [
							'#efb524',
							'#36d6cc',
						],
						borderColor: [
							'rgba(0, 0, 0, 0)',
							'rgba(0, 0, 0, 0)'
						]
					}],

					labels: [
						minLabel,
						maxLabel
					]
				}
				}
				options={{ legend: { display: false } }} />
		</div>
	)

Doughnut.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	minLabel: PropTypes.string,
	maxLabel: PropTypes.string,
}


export default Doughnut
