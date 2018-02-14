import React from 'react'

// import Doughnut from '../../components/Graph/Doughnut/Doughnut'

const Dashboard = () => (
	<div className='dashboard'>
		<div className='dashboard__firstRow'>
			<div className='dashboard__firstRow-header'>
				<h3>CONSUMO</h3>
				<hr />
				<button>
					<img src='/icons/ic_graficos_dg.svg' />
				</button>
			</div>
			<div>
				<div>
					<h1>1100</h1>
					<h2>,10</h2>
					<span>R$</span>
				</div>
				<div>
					<h1>789</h1>
					<h2>,0</h2>
					<span>kW/h</span>
				</div>
			</div>
		</div>
		<div className='dashboard__secondRow'>
			<div>
				<h3>CONSUMO</h3>
				<hr />
				<button>
					<img src='/icons/ic_graficos_dg.svg' />
				</button>
			</div>
			<div>
				BODY
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

export default Dashboard

