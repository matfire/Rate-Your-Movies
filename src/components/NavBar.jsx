import React from 'react'
import reactstrapCjs, {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,} from 'reactstrap';

class NavBarComponent extends React.Component {
	state = {
		isOpen:false
	}	
	render() {
		const toggle = () => {
			this.setState({
				isOpen: !this.state.isOpen
			})
		}
		return(
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Rate Your Movies</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/trending"><i className="fas fa-trophy"></i> Trending</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

export default NavBarComponent