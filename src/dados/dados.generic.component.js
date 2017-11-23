import React from 'react'
import { Link } from 'react-router-dom'

import DadosAPI from './dados.api'
import Card from './dados.card.number.component'
import BarChart from './dados.card.bar.chart.component'


class Generic extends React.Component {
	constructor(props) {
		super(props)
		this.state = { message: '' }
	}

	async componentDidMount() {
		this._isMounted = true
		try {
			this.setState(Object.assign(this.state, { message: 'loading' }))

			let count = (await DadosAPI.get('count')).data.count
			let day = (await DadosAPI.get('day')).data
			let last = (await DadosAPI.get('last')).data

			if (this._isMounted)
				this.setState({ count, day, last })
		} catch (err) {
			if (this._isMounted)
				this.setState({ message: err.toString() })
		}
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render() {
		let { count, day, last, message } = this.state

		let data
		let data1

		if (day) {
			let labels
			let dataVolts
			let dataAmps

			labels = day.map(d => {
				return d._id.day + '/' + d._id.month
			})

			dataVolts = day.map(d => d.volts)
			dataAmps = day.map(d => d.amps)

			data = {
				labels,
				datasets: [{
					label: 'Volts/Dia',
					data: dataVolts,
					backgroundColor: 'rgba(255, 255, 255, 1)',
					hoverBackgroundColor: 'rgba(255, 255, 255, 0.6)',
				}]
			}

			data1 = {
				labels,
				datasets: [{
					label: 'Amps/Dia',
					data: dataAmps,
					backgroundColor: 'rgba(255, 255, 255, 1)',
					hoverBackgroundColor: 'rgba(255, 255, 255, 0.6)',
				}],
				
			}
		}

		return <div className='col'>
			<div className='row'>
				{count && <Card color='indigo darken-1' title='Medicoes' icon='list' value={count} />}
				{last && <Card color='green darken-1' title='Amps' icon='battery_charging_full' value={Math.round(last.amps) + 'A'} />}
				{last && <Card color='deep-orange darken-1' title='Volts' icon='power' value={Math.round(last.volts) + 'V'} />}
				{/* <Card color='purple darken-1' /> */}
			</div>
			<div className='row'>
				<BarChart data={data} color='purple darken-1' />
				<BarChart data={data1} color='blue darken-1' />
			</div>
		</div >

	}
}

export default Generic