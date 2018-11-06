import React from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, NavLink } from 'reactstrap';


import SearchBar from './SearchBar'






class NavBarComponent extends React.Component {
	state = {
		isOpen:false	
	}
	toggle = () => {
		this.setState({isOpen: !this.state.isOpen})
	}
	renderLoggedInNavigation = () => {
		const session = localStorage.getItem("TMDB_session_id")
		const User = localStorage.getItem("User")
		if (!session) {
			return(
				<ul className="nav navbar-nav flex-child-menu menu-right">             
					<li className="btn signupLink"><a href="/login"><i className="fas fa-unlock-alt"></i>Login with TMDB</a></li>
				</ul>
			)
		}
		return (
				<ul className="nav navbar-nav flex-child-menu menu-right">             
						<li><a href="/list"><i className="fas fa-clipboard-list"></i>Your lists</a></li>
						<li><a href="/favorites"><i className="far fa-heart"></i>Your Favorites</a></li>
				</ul>
		)
	}
	render() {
		const options = this.renderLoggedInNavigation()
		return(
			<header className="ht-header">
				<div className="container">
					<nav className="navbar navbar-default navbar-custom">
						<div className="navbar-header logo">
				    		<div className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					    		<span className="sr-only">Toggle navigation</span>
					    			<div id="nav-icon1">
										<span></span>
										<span></span>
										<span></span>
									</div>
				    		</div>
				    		<a href="/">Rate Your Movie</a>
						</div>
						<div className="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
							{options}
						</div>
					</nav>
				</div>
			</header>
		)
	}
}

export default NavBarComponent