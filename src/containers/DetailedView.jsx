import React from 'react'
import axios from 'axios'
import { Card, CardText, CardBody, CardSubtitle, CardTitle, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap'
import classnames from 'classnames';



class DetailedView extends React.Component {
	state = {
		details: [],
		reviews: [],
		favorite: false,
		activeTab: '1'
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				details:res.data
			})
			const session = localStorage.getItem("TMDB_session_id")
			if(session) {
				this.getFavorite(this.props.match.params.id)
			}
		})
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id +"/reviews?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				reviews: res.data.results
			})
		})
	}

	renderReviews = () => {
		const reviews = 	this.state.reviews.map((r) => (
			<React.Fragment>
			<div className="row mt-3" key={r.id}>
				<div className="col-sm-2">
					<p>{r.author}</p>
				</div>
				<div className="col-sm-10">
					<p>{r.content}</p>
				</div>
			</div>
			<hr></hr>
			</React.Fragment>
	))
			if(reviews) {
		return(
			<React.Fragment>
				<p style={{textAlign:"center"}}>Reviews</p>
			<hr></hr>
			{reviews}
			</React.Fragment>
		)}
	}
	renderProductors = () => {
		if (this.state.details.production_companies) {
		return(
			this.state.details.production_companies.map((company) => (
				<div>
					<div className="col-sm-8 mt-5" key={company.id}>
						<div className="row">
							<div className="col-sm-4">
								<p>{company.name}</p>
							</div>
							<div className="col-sm-4">
								<img src={"https://image.tmdb.org/t/p/w185" + company.logo_path} alt={company.name}/>
							</div>
						</div>
					</div>
					<hr></hr>
				</div>
			))
		)}
	}
	getFavorite = (id) => {
		axios.get("https://api.themoviedb.org/3/movie/"+ id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
			this.setState({favorite: res.data.favorite})
		})
	}
	handleFavorite = (id) => {
		axios.post("https://api.themoviedb.org/3/account/"+ localStorage.getItem("User").id +"/favorite?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), {
			media_type : "movie",
			media_id: id,
			favorite: !this.state.favorite
		}).then((res) => {this.getFavorite(id)})
	}
	renderFavorite = (heart_class) => {
		const session = localStorage.getItem("TMDB_session_id")
		if (session) {
			return(
				<i className={heart_class} onClick={() => {this.handleFavorite(this.props.match.params.id)}}></i>
			)
		}
	}
	renderCountries = () => {
		if (this.state.details.production_countries) {
			const items = this.state.details.production_countries.map((countri) => (
				<ListGroupItem>{countri.name}</ListGroupItem>
			))
			return <ListGroup>{items}</ListGroup>
		}
	}
	toggle = (tab) => {
		if(this.state.activeTab !== tab)
			this.setState({activeTab:tab})
	}
	render() {
		const reviews = this.renderReviews()
		const productors = this.renderProductors()
		const countries = this.renderCountries()
		let heart_class = "fa-heart"
		if (this.state.favorite === true){
			heart_class = "fas " + heart_class
		} else {
			heart_class = "far " + heart_class
		}
		const favorite = this.renderFavorite(heart_class)
		return(
			<div>
				<div className="row">
					<div className="col-sm-4 mt-5">
						<img src={"https://image.tmdb.org/t/p/w342"+ this.state.details.poster_path} alt={this.state.details.original_title}/>
					</div>
					<div className="col-sm-8 mt-5">
						<Card>
							<CardBody>
								<CardTitle>{this.state.details.original_title}</CardTitle>
								<CardSubtitle>{this.state.details.tagline}  {favorite}</CardSubtitle>
								<CardText>
									<br></br>
									<p>{this.state.details.overview}</p>
									<p><strong>Status: </strong>{this.state.details.status}</p>
									<p><strong>Rating: </strong>{this.state.details.vote_average} ({this.state.details.vote_count} votes)</p>
									
									<Nav tabs>
										<NavItem>
											<NavLink className={classnames({active: this.state.activeTab === '1'})} onClick={() => {this.toggle('1')}}>
												Produced By
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink className={classnames({active: this.state.activeTab === '2'})} onClick={() => {this.toggle('2')}}>
												Produced In
											</NavLink>
										</NavItem>
									</Nav>
									<TabContent activeTab={this.state.activeTab}>
										<TabPane tabId="1">
											{productors}
										</TabPane>
										<TabPane tabId="2">
											{countries}
										</TabPane>
									</TabContent>
								</CardText>
							</CardBody>
						</Card>
					</div>
				</div>
				<div id="reviews" className="mt-5">
				{reviews}
				</div>
			</div>
		)
	}
}

export default DetailedView