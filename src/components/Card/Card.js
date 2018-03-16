import React from 'react'
import PropTypes from 'prop-types'

import Line from '../Graph/Line/Line'

export const Card = ({
	unit,
	color,
	data = [],
	labels = [],
	number = 0,
	decimal = false,
	graph = false
}) =>
	(
		<div className='card'>
			{graph ?
				<Line
					color={color}
					data={data}
					labels={labels} /> :
				<div className='card__numbers'>
					<h1 style={{ color }}>{Math.trunc(number)}</h1>
					{decimal &&
						<h2 style={{ color }}>
							,{String(number.toFixed(2)).split('.')[1][0]}
						</h2>
					}
					<span>{unit}</span>
				</div>
			}
		</div>
	)

Card.propTypes = {
	graph: PropTypes.bool,
	data: PropTypes.array,
	labels: PropTypes.array,
	unit: PropTypes.string,
	color: PropTypes.string,
	decimal: PropTypes.bool,
	number: PropTypes.number,
}


export default Card
