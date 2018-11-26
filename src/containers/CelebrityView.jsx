import React from 'react'
import {Row, Col, MDBRow, MDBCol, TabPane, TabContent, Nav, NavItem, NavLink, Container} from 'mdbreact'
import classnames from 'classnames'
import axios from 'axios'
import Truncate from 'react-truncate';

class CelebrityView extends React.Component {
	state = {
		activeTab: 1,
		data: {}
	}
	componentDidMount() {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		axios.get("https://api.themoviedb.org/3/person/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language + "&append_to_response=movie_credits").then(res => {
			this.setState({data:res.data})
		})
	}
	toggleTab = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({activeTab:tab})
		}
	}
	render() {
		return(
				<Row className="mt-5">
					<Col md="4">
						<img src={"https://image.tmdb.org/t/p/h632" + this.state.data.profile_path} alt={this.state.data.name} className="img-fluid"/>
					</Col>
					<Col md="8">
						<h2>{this.state.data.name}</h2>
						<p>{this.state.data.known_for_department}</p>
						<div className="classic-tabs">
							<Nav classicTabs color="blue">
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeTab === 1})} onClick={() => this.toggleTab(1)}>Overview</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeTab === 2})} onClick={() => this.toggleTab(2)}>Biography</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeTab === 3})} onClick={() => this.toggleTab(3)}>Filmography</NavLink>
								</NavItem>
							</Nav>
							<TabContent className="card" activeItem={this.state.activeTab}>
								<TabPane tabId={1}>
									<Truncate lines={12}>{this.state.data.biography}</Truncate>
									<a href="#" onClick={() => this.toggleTab(2)}>See Full Bio</a>
									<br></br>
									<h6>FILMOGRAPHY       <a href="#" onClick={() => this.toggleTab(3)}>See Full Filmography</a></h6>
									{ this.state.data.movie_credits && this.state.data.movie_credits.cast.map((movie, index) => (
										index < 10 &&
										<Row className="mt-3" key={movie.id}>
											<Col md="4">
											<a href={"/movies/" + movie.id}><img src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} alt={movie.title} className="img-fluid"/></a>
											</Col>
											<Col md="8">
												<p>{movie.title} <small>{movie.release_date.substring(0, 4)}</small></p>
											</Col>
										</Row>
									))}
								</TabPane>
								<TabPane tabId={2}>
									<p>{this.state.data.biography}</p>
								</TabPane>
								<TabPane tabId={3}>
								{ this.state.data.movie_credits && this.state.data.movie_credits.cast.map((movie, index) => (
										<Row className="mt-3" key={movie.id}>
											<Col md="4">
												<a href={"/movies/" + movie.id}><img src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} alt={movie.title} className="img-fluid"/></a>
											</Col>
											<Col md="8">
												<p>{movie.title} { movie.release_date && <small>movie.release_date.substring(0, 4)</small>}</p>
											</Col>
										</Row>
									))}								
								</TabPane>
							</TabContent>
						</div>
					</Col>
				</Row>
		)
	}
}

export default CelebrityView