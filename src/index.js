import React from 'react'
import App from './common/App'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'chart.js'
import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('app'))