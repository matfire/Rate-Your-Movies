import React from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Button, toast, Chip } from "mdbreact";
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
		const User = JSON.parse(localStorage.getItem("User"))
		return(
					<Navbar color="blue" dark expand="md" id="top-section">
						<NavbarBrand>
				    		<a href="/" style={{color:"inherit"}}>Rate Your Movie</a>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle}></NavbarToggler>
						<Collapse isOpen={this.state.isOpen} navbar>
						<NavbarNav left>
							{options}
						</NavbarNav>
						<NavbarNav right>
							<NavItem>
								{localStorage.getItem("User") && localStorage.getItem("TMDB_session_id") &&
									<Button color="danger" onClick={() => {
									localStorage.removeItem("User");
									localStorage.removeItem("TMDB_session_id")
									toast.success("You have been succesfully disconnected")
									this.setState({isOpen: this.state.isOpen})
									}}>Logout</Button>}
							</NavItem>
						</NavbarNav>
						</Collapse>
					</Navbar>
		)
	}
}

export default NavBarComponent
