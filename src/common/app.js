import React from 'react'
import Home from '../home/home'
import Dados from '../dados/dados.main.component'
import Header from '../common/header'
import { Switch, Route } from 'react-router-dom'

import firebase from 'firebase/app'
// const firebase = require('firebase')

class App extends React.Component {
	constructor(props) {
		super(props)


		// let fb = firebase.initializeApp({
		// 	apiKey: 'AAAAylAQdf8:APA91bFDH6822LlUxWn11vGPtKEZeMf6S9sUqxf9DB76-Bo0FjO5q7wSFIRVl7Q8SrgfrWrmqP4Q6qtD_rH3L6LoKz1ya1aUxEeWtSgSIDEw3pAiItm9znXL-PNXFYYULyqEvWbkAzWj',
		// 	authDomain: 'monkey-735a9.firebaseapp.com',
		// 	messagingSenderId: '868926649855',
		// })

		// let msg
		// try {
		// 	console.log(fb)
		// 	msg = fb.messaging()
		// 	console.log(msg)
		// } catch (err) {
		// 	console.log(err)
		// }

	}


	render() {
		return (
			<div>
				{<Header />}
				{/* <Main /> */}
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/dados' component={Dados} />
				</Switch>
			</div>
		)
	}
}

export default App