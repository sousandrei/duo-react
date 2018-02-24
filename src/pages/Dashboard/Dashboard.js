import React from 'react'
import moment from 'moment'
import { merge } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getData } from '../../actions/data'

// import Doughnut from '../../components/Graph/Doughnut/Doughnut'

export class Dashboard extends React.Component {

	state = {
		last: {
			volts: '0',
			amps: '0.0',
			kw: '0.0'
		},
		consumption: {
			real: '0.0',
			kwh: '0.0',
		}
	}

	componentWillReceiveProps(nextProps) {
		// const day = nextProps.data.day
		// const week = nextProps.data.week
		const month = nextProps.data.month
		const last = nextProps.data.last


		const initMonthDate = new Date(new Date().getFullYear(),
			new Date().getMonth(), 1)
		const hours = moment().diff(initMonthDate) / 3600000

		let state = {
			last: {
				volts: last ? Math.round(last.volts.toFixed(1)) : '0',
				amps: last ? String(last.amps.toFixed(1)) : '0.0',
				kw: last ? String(last.watts.toFixed(1) / 1000) : '0.0'
			},
			consumption: {
				real: month.length ?
					String(((month[0].watts / 1000) / hours) * .6130414) :
					'0.0',
				kwh: month.length ?
					String((month[0].watts / 1000) / hours) : '0.0',
			}
		}

		this.setState(merge(this.state, state))
	}

	componentWillMount() {
		this.props.getData()
	}

	render() {
		return (<div className='dashboard'>
			<div className='dashboard__firstRow'>
				<div className='dashboard__firstRow-header'>
					<h3>CONSUMO</h3>
					<hr />
					<button>
						<img src='/icons/ic_graficos_dg.svg' />
					</button>
				</div>
				<div className='dashboard__firstRow-body'>
					<div>
						<h1>{this.state.consumption
							.real.split('.')[0]}</h1>
						<h2>,{this.state.consumption
							.real.split('.')[1][0]}</h2>
						<span>R$</span>
					</div>
					<hr />
					<div>
						<h1>{this.state.consumption
							.kwh.split('.')[0]}</h1>
						<h2>,{this.state.consumption
							.kwh.split('.')[1][0]}</h2>
						<span>kW/h</span>
					</div>
				</div>
			</div>
			<div className='dashboard__secondRow'>
				<div className='dashboard__secondRow-section'>
					<div className='dashboard__secondRow-header'>
						<h3>TENSÂO</h3>
						<hr />
						<button>
							<img src='/icons/ic_graficos_dg.svg' />
						</button>
					</div>
					<div className='dashboard__secondRow-body'>
						<div>
							<h1>{this.state.last.volts}</h1>
							<span>V</span>
						</div>
					</div>
				</div>
				<hr />
				<div className='dashboard__secondRow-section'>
					<div className='dashboard__secondRow-header'>
						<h3>CORRENTE</h3>
						<hr />
						<button>
							<img src='/icons/ic_graficos_dg.svg' />
						</button>
					</div>
					<div className='dashboard__secondRow-body'>
						<div>
							<h1>{this.state.last.amps.split('.')[0]}</h1>
							<h2>,{this.state.last.amps.split('.')[1][0]}</h2>
							<span>A</span>
						</div>
					</div>
				</div>
				<hr />
				<div className='dashboard__secondRow-section'>
					<div className='dashboard__secondRow-header'>
						<h3>POTÊNCIA</h3>
						<hr />
						<button>
							<img src='/icons/ic_graficos_dg.svg' />
						</button>
					</div>
					<div className='dashboard__secondRow-body'>
						<div>
							<h1>{this.state.last.kw.split('.')[0]}</h1>
							<h2>,{this.state.last.kw.split('.')[1][0]}</h2>
							<span>kW</span>
						</div>
					</div>
				</div>
			</div>
			{/* <div className='dashboard__graphs'>
			<Doughnut
				min={25}
				max={75}
				minLabel={'Label1'}
				maxLabel={'Label2'} />
			<Doughnut
				min={50}
				max={50}
				minLabel={'Label3'}
				maxLabel={'Label4'} />
		</div>
		<hr className='dashboard__divider' />
		<div className='dashboard__calendar'>
			oi
		</div> */}
		</div>
		)
	}
}

Dashboard.propTypes = {
	getData: PropTypes.func,
	data: PropTypes.object,
}



const mapStateToProps = state => {
	return {
		data: state.data
	}
}

const mapDispatchToProps = dispatch => ({
	getData: () => dispatch(getData())
})



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
