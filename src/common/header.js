import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {

	componentDidMount() {
		$(".button-collapse").sideNav()
	}

	render() {
		return <header className='navbar-fixed'>
			<nav>
				<div className='nav-wrapper light-blue darken-2'>
					<a href='#!' className='brand-logo center'>Logo</a>
					<a href='#' data-activates='mobile-demo' className='button-collapse'><i className='material-icons'>menu</i></a>
					<ul className='right hide-on-med-and-down'>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/dados'>Dados</Link></li>
					</ul>
					<ul className='side-nav' id='mobile-demo'>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/dados'>Dados</Link></li>
					</ul>
				</div>
			</nav>
		</header>

	}
}

export default Header