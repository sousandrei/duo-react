import React from 'react'
import DadosAPI from './dados.api'

import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

class Card extends React.Component {

	render() {
		let textStyle = {
			fontSize: '24px'
		}

		return <div className='col s6 l4'>
			<div className={`card ${this.props.color}`}>
				<div className='card-content white-text center-align'>
					<i className="material-icons">{this.props.icon}</i>
					<span style={textStyle}>{this.props.title}</span>
					<h4>{this.props.value}</h4>
				</div>
			</div>
		</div>

	}
}

Card.defaultProps = {
	title: 'Card',
	icon: 'add',
	value: 0
}

export default Card