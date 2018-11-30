import React from 'react'
import {MDBRow, MDBCol, TabPane, TabContent, Nav, NavItem, NavLink, Fa, Spinner} from 'mdbreact'
import classnames from 'classnames'
import axios from 'axios'
import Truncate from 'react-truncate';



class SimilarTab extends React.Component {
	getSimilars = () => {
		if (this.props.data) {
			if (this.props.data.length === 0) {
				return(<p>Sorry, no related movies were found</p>)
			}
		const result = this.props.data.map((movie, index) => {
			if (movie.release_date) {
				let year = movie.release_date.substring(0,4)
			return(
			<React.Fragment key={movie.id}>
			<div className="row mt-2 mb-2" >
				<div className="col-md-4">
					<a href={"/movies/" + movie.id}>
						<img className="img-fluid z-depth-2" src={"https://image.tmdb.org/t/p/w342/" + movie.poster_path} alt={movie.title} />
					</a>
				</div>

				<div className="col-md-8">
					<h4><a href={"/movies/" + movie.id}>{movie.title}</a>  ({year})</h4>
					<Fa icon="star" style={{color:"#f5b50a"}} /> {movie.vote_average}/10<br></br>
					<Truncate lines={3}>{movie.overview}</Truncate>
					
				</div>
			</div>
			<hr></hr>
			</React.Fragment>
		)}})
		return result
		}
	}
	render() {
		const data = this.getSimilars()
		return(
			<React.Fragment>
				{data}
			</React.Fragment>
		)
	}
}

class CelebrityView extends React.Component {
	state = {
		activeTab: 1,
		data: {},
		loading: true
	}
	componentDidMount() {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		axios.get("https://tmdb.dev.matteogassend.com/person/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language + "&append_to_response=movie_credits").then(res => {
			this.setState({data:res.data, loading:false})
		})
	}
	toggleTab = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({activeTab:tab})
		}
	}
	render() {
		if (this.state.loading) {
			return(
				<MDBRow center className="mt-5 pt-5">
					<Spinner blue big />
				</MDBRow>
			)
		}
		return(
			<div className="container">
				<MDBRow className="mt-5">
					<MDBCol md="4">
						<img src={"https://image.tmdb.org/t/p/h632" + this.state.data.profile_path} alt={this.state.data.name} className="img-fluid  z-depth-2"/>
					</MDBCol>
					<MDBCol md="8">
						<h1 className="h2-responsive">{this.state.data.name}</h1>
						
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
									{this.state.data.biography }<p>[ <a href="#" onClick={() => this.toggleTab(2)}> See Full Bio  </a>] </p>
									
									<h6 className="mb-4 mt-5">FILMOGRAPHY </h6>
									{ this.state.data.movie_credits && this.state.data.movie_credits.cast.map((movie, index) => (
										index < 3 &&
										<React.Fragment key={movie.id}>
										<div className="row mt-2 mb-2" >
										<div className="col-md-4">
											<a href={"/movies/" + movie.id}>
												<img className="img-fluid z-depth-2" src={"https://image.tmdb.org/t/p/w342/" + movie.poster_path} alt={movie.title} />
											</a>
										</div>
						
										<div className="col-md-8">
											<h4><a href={"/movies/" + movie.id}>{movie.title}</a>  ({movie.release_date && movie.release_date.substring(0,4)})</h4>
											<Fa icon="star" style={{color:"#f5b50a"}} /> {movie.vote_average}/10<br></br>
											<Truncate lines={3}>{movie.overview}</Truncate>
											
										</div>
									</div>
									<hr />
									
									</React.Fragment>
									))}
									<p>[ <a href="#" onClick={() => this.toggleTab(3)} >See Full Filmography</a> ]</p>
								</TabPane>
								<TabPane tabId={2}>
									<p>{this.state.data.biography}</p>
								</TabPane>
								<TabPane tabId={3}>
								{ this.state.data.movie_credits && this.state.data.movie_credits.cast && <SimilarTab data={this.state.data.movie_credits.cast} />}
								{/* { this.state.data.movie_credits && this.state.data.movie_credits.cast.map((movie, index) => (
										<MDBRow className="mt-3" key={movie.id}>
											<MDBCol md="4">
												<a href={"/movies/" + movie.id}><img src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} alt={movie.title} className="img-fluid"/></a>
											</MDBCol>
											<MDBCol md="8">
												<p>{movie.title} { movie.release_date && <small>{movie.release_date.substring(0, 4)}</small>}</p>
											</MDBCol>
										</MDBRow>
									))}								 */}
								</TabPane>
							</TabContent>
						</div>
					</MDBCol>
				</MDBRow>
				</div>
		)
	}
}

export default CelebrityView