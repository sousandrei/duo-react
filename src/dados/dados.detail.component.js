import React from 'react'
import DadosAPI from './dados.api'

class Detail extends React.Component {
	constructor(props) {
		super(props)
		this.state = { dado: undefined, message: '' }
	}

	async componentDidMount() {
		this._isMounted = true
		try {
			this.setState(Object.assign(this.state, { message: 'loading' }))
			let dado = await DadosAPI.get(this.props.match.params.number)

			if (this._isMounted)
				this.setState(Object.assign({ dado: dado.data, message: '' }))
		} catch (err) {
			if (this._isMounted)
				this.setState(Object.assign({ dado: undefined, message: 'error' }))
		}
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render() {
		let { dado, message } = this.state

		if (!dado)
			return <div>
				<span>dado {this.props.match.params.number}</span>
				<br />
				<span>{message}</span>
			</div>

		return <div>
			<h4>dado</h4>
			<span>id: {dado._id}</span>
			<br />
			<span>amps: {dado.amps}</span>
		</div>

	}
}

export default Detail