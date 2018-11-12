import React from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";
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
						<NavLink style={{paddingLeft:"20px"}} to="/login">Login with TMDB</NavLink>
					</NavItem>
					<NavItem >
							<NavLink style={{paddingLeft:"20px"}} className="pl-3" to="/trending">Trending</NavLink>
					</NavItem>
			</React.Fragment>
			)
		}
		return (
			<React.Fragment>
					<NavItem>
							<NavLink style={{paddingLeft:"20px"}} to="/list">Your lists</NavLink>
					</NavItem>
					<NavItem>
							<NavLink style={{paddingLeft:"20px"}} to="/favorites">Your Favorites</NavLink>
					</NavItem>
					<NavItem>
							<NavLink style={{paddingLeft:"20px"}} to="/trending">Trending</NavLink>
					</NavItem>
			</React.Fragment>
		)
	}
	render() {
		const options = this.renderLoggedInNavigation()
		return(
					<Navbar color="blue" dark expand="md" id="top-section">
						<NavbarBrand>
				    		Rate Your Movie
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle}></NavbarToggler>
						<Collapse isOpen={this.state.isOpen} navbar>
						<NavbarNav left>
							{options}
						</NavbarNav>
						</Collapse>
					</Navbar>
		)
	}
}

export default NavBarComponent
