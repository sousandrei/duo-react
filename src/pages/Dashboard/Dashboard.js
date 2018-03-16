import React from 'react'
import moment from 'moment'
import { merge } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getData } from '../../actions/data'

import Card from '../../components/Card/Card'

import {
	rosa,
	verde,
	laranja,
	azulClaro,
	azulEscuro
} from '../../styles/base/_settings.scss'


const precoLuz = .6130414
const weekInit = new Date().getDate() - new Date().getDay()

const initMonthDate = new Date(new Date().getFullYear(),
	new Date().getMonth(), 1)

const hoursSinceMonth = moment().diff(initMonthDate) / 3600000
const hoursSinceWeek = moment().diff(moment(weekInit)) / 3600000

export class Dashboard extends React.Component {

	state = {
		day: [],
		month: [],
		semester: [],
		last: {
			volts: 0,
			amps: 0,
			kw: 0
		},
		consumption: {
			real: 0,
			kwh: 0,
		}
	}

	componentWillReceiveProps(nextProps) {
		const last = nextProps.data.last
		const day = nextProps.data.day
		const week = nextProps.data.week
		const month = nextProps.data.month || []
		const semester = nextProps.data.semester

		let state = {
			select: nextProps.select,
			day,
			week,
			month,
			semester,
			last: {
				volts: last ? last.volts : 0,
				amps: last ? last.amps : 0,
				kw: last ? last.watts / 1000 : 0
			},
			consumption: {
				real: month.length ?
					((month[0].watts / 1000) / hoursSinceMonth) * precoLuz : 0,
				kwh: month.length ?
					(month[0].watts / 1000) / hoursSinceMonth : 0,
			}
		}

		this.setState(merge(this.state, state))
	}

	componentWillMount() {
		this.props.getData()
	}

	render() {
		const {
			day,
			week,
			month,
			semester,
			last: {
				volts,
				amps,
				kw
			},
			consumption: {
				real,
				kwh
			}
		} = this.state


		let labels
		let history

		switch (this.state.select) {
			default:
			case 'dia':
				history = day.sort((a, b) => a._id.hour > b._id.hour ? 1 : -1)
				labels = day
					.sort((a, b) => a._id.hour > b._id.hour ? 1 : -1)
					.map(d => d._id.hour)
				break
			case 'week':
				history = week.sort((a, b) => a._id.day > b._id.day ? 1 : -1)
				labels = week
					.sort((a, b) => a._id.day > b._id.day ? 1 : -1)
					.map(d => d._id.day)
				break
			case 'month':
				history = month.sort((a, b) => a._id.day > b._id.day ? 1 : -1)
				labels = month
					.sort((a, b) => a._id.day > b._id.day ? 1 : -1)
					.map(d => d._id.day)
				break
			case 'semester':
				history = semester.sort((a, b) => a._id.month > b._id.month
					? 1 : -1)
				labels = semester
					.sort((a, b) => a._id.month > b._id.month ? 1 : -1)
					.map(d => d._id.month)
				break
		}


		history = {
			volts: history.map(d => d.volts),
			amps: history.map(d => d.amps),
			kw: history.map(d => d.watts / 1000),
			kwh: history.map(d => {
				const { day, hour } = d._id
				let hours

				if (hour)
					hours = hoursSinceMonth
				else if (day)
					hours = hoursSinceWeek
				else
					hours = 720

				return d.watts / 1000 / hours
			}),
			real: []
		}

		if (this.state.select == 'semester') {
			history = {
				...history,
				kw: semester.sort((a, b) => a._id.month > b._id.month
					? 1 : -1).map(d => d.watts / 1000),
				kwh: semester.sort((a, b) => a._id.month > b._id.month
					? 1 : -1).map(d => d.watts / 1000 / 720),
				real: []
			}
		}


		for (let i in history.kwh) {
			if (i < 1) {
				history.real[i] = history.kwh[i] * precoLuz
				continue
			}

			history.real[i] = history.kwh[i] * precoLuz
		}



		return (
			<div className='dashboard'>
				<div className='dashboard__firstRow'>
					<div className='dashboard__firstRow-header'>
						<h3>CONSUMO</h3>
					</div>
					<div className='dashboard__firstRow-body'>
						<Card
							decimal
							unit={'R$'}
							number={real}
							color={verde}
							labels={labels}
							data={history.real}
							graph={this.props.graph} />
						<hr />
						<Card
							decimal
							unit={'kW/h'}
							number={kwh}
							color={laranja}
							labels={labels}
							data={history.kwh}
							graph={this.props.graph} />
					</div>
				</div>
				<div className='dashboard__secondRow'>
					<div className='dashboard__secondRow-section'>
						<div className='dashboard__secondRow-header'>
							<h3>TENSÂO</h3>
						</div>
						<div className='dashboard__secondRow-body'>
							<Card
								unit={'V'}
								number={volts}
								color={azulClaro}
								labels={labels}
								data={history.volts}
								graph={this.props.graph} />
						</div>
					</div>
					<hr />
					<div className='dashboard__secondRow-section'>
						<div className='dashboard__secondRow-header'>
							<h3>CORRENTE</h3>
						</div>
						<div className='dashboard__secondRow-body'>
							<Card
								decimal
								unit={'A'}
								number={amps}
								color={azulEscuro}
								labels={labels}
								data={history.amps}
								graph={this.props.graph} />
						</div>
					</div>
					<hr />
					<div className='dashboard__secondRow-section'>
						<div className='dashboard__secondRow-header'>
							<h3>POTÊNCIA</h3>
						</div>
						<div className='dashboard__secondRow-body'>
							<Card
								decimal
								unit={'kW'}
								number={kw}
								color={rosa}
								labels={labels}
								data={history.kw}
								graph={this.props.graph} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	getData: PropTypes.func,
	data: PropTypes.object,
	graph: PropTypes.bool,
	select: PropTypes.string
}



const mapStateToProps = state => ({
	data: state.data,
	graph: state.state.graph,
	select: state.state.select
})


const mapDispatchToProps = dispatch => ({
	getData: () => dispatch(getData())
})



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
