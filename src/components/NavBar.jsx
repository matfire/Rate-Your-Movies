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
		if (!session) {
			return(
				<React.Fragment>
					<NavItem >
						<NavLink style={{paddingLeft:"20px"}} href="/login">Login with TMDB</NavLink>
					</NavItem>
					<NavItem >
							<NavLink style={{paddingLeft:"20px"}} className="pl-3" href="/favorites">Your Favorites</NavLink>
					</NavItem>
			</React.Fragment>
			)
		}
		return (
			<React.Fragment>
					<NavItem>
							<NavLink style={{paddingLeft:"20px"}} href="/list">Your lists</NavLink>
					</NavItem>
					<NavItem>
							<NavLink style={{paddingLeft:"20px"}} href="/favorites">Your Favorites</NavLink>
					</NavItem>
					<NavItem>
							<NavLink style={{paddingLeft:"20px"}} href="/trending">Trending</NavLink>
					</NavItem>
			</React.Fragment>
		)
	}
	render() {
		const options = this.renderLoggedInNavigation()
		return(
			<header className="ht-header">
				<div className="container">
					<Navbar className="navbar navbar-default navbar-custom" expand="md">
						<NavbarBrand className="navbar-header logo" href="/">
				    		Rate Your Movie
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle} className="navbar-toggle"></NavbarToggler>
						<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="collapse navbar-collapse flex-parent ml-auto" navbar>
							{options}

						</Nav>
						</Collapse>
					</Navbar>
				</div>
			</header>
		)
	}
}

export default NavBarComponent
