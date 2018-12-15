import React from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Button, toast, FormInline, ListGroup, ListGroupItem, Fa } from "mdbreact";
import {
	MDBSelect,
	MDBSelectInput,
	MDBSelectOptions,
	MDBSelectOption} from 'mdbreact'
import axios from 'axios'
import options from '../languages'



class NavBarComponent extends React.Component {
	state = {
		isOpen:false,
		searchQuery: "",
		searchResult: [],
		langOptions: options
	}
	toggle = () => {
		this.setState({isOpen: !this.state.isOpen})
	}
	setSelectedLanguage = (e) => {
		console.log(e[0])
		let User = JSON.parse(localStorage.getItem("User"))
		if (User) {
			User.low_la = e[0]
			localStorage.setItem("User", JSON.stringify(User))
		}
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
	handleSearchChange = (e) => {
		let language = "us-US"
		let User = JSON.parse(localStorage.getItem("User"))
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}	
		this.setState({searchQuery: e.target.value}, () => {
			if (this.state.searchQuery && this.state.searchQuery.length > 1) {
				if(this.state.searchQuery.length % 2 === 0) {
					let query = encodeURI(this.state.searchQuery)
					console.log(query)
					axios.get("https://api.themoviedb.org/3/search/movie?api_key=2005b3a7fc676c3bd69383469a281eff&language="+language+"&query="+query+"&page=1&include_adult=false").then(res => {
						this.setState({searchResult:res.data.results})
					})
				}
			} else if(this.state.searchQuery === "" || this.state.searchQuery.length === 0) {
				this.setState({searchResult:[]})
			}
		})
	}
	render() {
		const options = this.renderLoggedInNavigation()
		return(
			
					<Navbar color=" pl-5 pr-5" dark expand="md" id="top-section">
					<div className="container">
						<NavbarBrand>
				    		<a href="/" style={{color:"inherit"}}><img className="img-fluid " src="/images/assets/logo.png" alt="Rate You Movie" /></a>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle}></NavbarToggler>
						<Collapse isOpen={this.state.isOpen} navbar>
						<NavbarNav left>
							{options}
						</NavbarNav>
						<NavbarNav left>
							<NavItem>
									<FormInline waves onSubmit={(e) => {e.preventDefault()}}>
										<div className="md-form w-100">
											<Fa icon="search" className="float-left mt-2" /><input className=" form-control form-control-sm w-75" type="text" placeholder="Search for a movie ..." aria-label="Search" value={this.state.searchQuery} onChange={this.handleSearchChange}/>
										</div>
									</FormInline>
									<ListGroup>
										{this.state.searchResult.map((movie, index) => (
											index < 4 && <ListGroupItem key={movie.id} onClick={() => this.setState({searchQuery:""})}><a href={"/movies/" + movie.id}>{movie.title}</a></ListGroupItem>
										))}
									</ListGroup>
							</NavItem>
						</NavbarNav>
						<NavbarNav left className="pt-2 pl-2">	
							<NavItem>
								{localStorage.getItem("User") && localStorage.getItem("TMDB_session_id") &&
									<Button color="cyan" outline size="sm" onClick={() => {
									localStorage.removeItem("User");
									localStorage.removeItem("TMDB_session_id")
									toast.success("You have been succesfully disconnected")
									this.setState({isOpen: this.state.isOpen})
									}}>Logout</Button>}
							</NavItem>
							<NavItem>
								{localStorage.getItem("User") && localStorage.getItem("TMDB_session_id") &&
									<MDBSelect selected="Choose your language"  getValue={this.setSelectedLanguage}>
										<MDBSelectInput selected="Choose your language" className="text-white"/>
										<MDBSelectOptions search={true}>
											{this.state.langOptions}
										</MDBSelectOptions>
									</MDBSelect>
							}
							</NavItem>
						</NavbarNav>
						</Collapse>
						</div>
					</Navbar>
			
		)
	}
}

export default NavBarComponent
