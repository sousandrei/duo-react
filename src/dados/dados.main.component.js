import React from 'react'
import Detail from './dados.detail.component'
import Generic from './dados.generic.component'
import { Switch, Route } from 'react-router-dom'

class Dados extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/dados' component={Generic} />
					<Route path='/dados/:number' component={Detail} />
				</Switch>
			</div>
		)
	}
}

export default Dados