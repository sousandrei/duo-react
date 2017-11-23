import React from 'react'
import DadosAPI from './dados.api'

import { Bar } from 'react-chartjs-2'

class BarCard extends React.Component {

	render() {
		return <div className='col s12 l6'>
			<div className={`card ${this.props.color}`}>
				<div className='card-content white-text center-align'>
					{this.props.data && <Bar data={this.props.data} options={this.props.options} />}
				</div>
			</div>
		</div>
	}
}

BarCard.defaultProps = {
	title: 'Card',
	options: {
		scales: {
			xAxes: [{
				ticks: {
					fontColor: '#fff'
				},
				gridLines: {
					color: 'rgba(255, 255, 255, 0.5'
				}
			}],
			yAxes: [{
				ticks: {
					fontColor: '#fff'
				},
				gridLines: {
					color: 'rgba(255, 255, 255, 0.5'
				}
			}]
		},
		legend: {
			labels: {
				fontColor: '#fff'
			}
		}
	}
}

export default BarCard