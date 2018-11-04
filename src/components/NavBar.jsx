import React from 'react'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,} from 'reactstrap';

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
				<NavItem>
					<NavLink href="/login"><i className="fas fa-unlock-alt"></i>Login with TMDB</NavLink>
				</NavItem>
			)
		}
		return (
			<React.Fragment>
				<NavItem>
					<NavLink href="/list"><i className="fas fa-clipboard-list"></i>Your lists</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/favorites"><i className="fas fa-heart"></i>Your Favorites</NavLink>
				</NavItem>
			</React.Fragment>
		)
	}
	render() {
		const options = this.renderLoggedInNavigation()
		return(
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Rate Your Movies</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<SearchBar />
							</NavItem>
							<NavItem>
								<NavLink href="/trending"><i className="fas fa-trophy"></i> Trending</NavLink>
							</NavItem>
							{options}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

export default NavBarComponent