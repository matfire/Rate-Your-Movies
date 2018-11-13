import React from 'react'
import axios from 'axios'
import {Nav, Row, Col, Fa, Far } from 'mdbreact';
import {TabPane, TabContent, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'mdbreact'
import StickyBox from "react-sticky-box";
import { Button, Card, CardBody, CardImage, Iframe, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import StarRatingComponent from 'react-star-rating-component';

class SimilarTab extends React.Component {
	getSimilars = () => {
		if (this.props.data) {
		const result = this.props.data.results.map((movie, index) => {
			if (index < 10) {
			return(
			<ListGroupItem key={movie.id}>
			<div className="row">
				<div className="col-md-6">
					<a href={"/movies/" + movie.id}>
						<img className="img-fluid" src={"https://image.tmdb.org/t/p/w342/" + movie.poster_path} alt={movie.title} />
					</a>
				</div>

				<div className="col-md-6">
					<h4>{movie.title}</h4>
					<hr></hr>
					<p>{movie.overview}</p>
				</div>
			</div>
			</ListGroupItem>
		)}})
		return result
		}
	}
	render() {
		const data = this.getSimilars()
		return(
			<ListGroup>
				{data}
			</ListGroup>
		)
	}
}

class DetailedView extends React.Component {
	state = {
		details: [],
		states: {},
		activeItem: 1,
		trailerModal: false,
		rating: 0
	}
	getData = () => {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&append_to_response=credits,videos,images,similar,reviews").then(res => {
			this.setState({
				details:res.data
			})
		})
		this.getStates()
	}
	getStates = () => {
		let session = localStorage.getItem("TMDB_session_id")
		if (session){
			axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {this.setState({states: res.data})})
		}
	}
	toggleModal = () => {
		this.setState({
			trailerModal: !this.state.trailerModal
		})
	}
	changeTab = (tab) => {
		if(this.state.activeItem !== tab) {
			this.setState({activeItem: tab})
		}
	}
	getTrailerUrl = () => {
		if(this.state.details.videos) {
			for(let i = 0; i < this.state.details.videos.results.length; i++) {
				if (this.state.details.videos.results[i].type === "Trailer" && this.state.details.videos.results[i].size >= 480)
					return("https://www.youtube.com/embed/" + this.state.details.videos.results[i].key)
			}
		}
	}
	toggleFavorite = () => {
		const User = JSON.parse(localStorage.getItem("User"))
		let data = {
			media_type:"movie",
			media_id: this.state.details.id,
			favorite: !this.state.states.favorite
		}
		console.log(User)
		axios.get("https://api.themoviedb.org/3/account/" + User.id + "/favorite?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), data).then(this.getStates())
	}
	checkFavorite = () => {
		let session = localStorage.getItem("TMDB_session_id")
		if (!session){
			return
		}
		if(this.state.states.favorite === false) {
			return(<i className="far fa-heart" onClick={this.toggleFavorite}/>)
		}
		return(<i className="fa fa-heart" onClick={this.toggleFavorite}/>)
	}
	render() {
		if (this.state.details.length === 0) {
			this.getData()
		}
		let year = this.state.details.release_date
		let favorite_icon = this.checkFavorite()
		let trailerUrl = ""
		if(year) {
		  year = year.substring(0, 4)
		  trailerUrl = this.getTrailerUrl()
		  console.log(trailerUrl)
		}
		return(
			<div className="row mt-5">
				<Modal isOpen={this.state.trailerModal} toggle={() => this.toggleModal()} centered size="lg">
					<ModalHeader toggle={() => this.toggleModal()}>Trailer for {this.state.details.title}</ModalHeader>
					<ModalBody>
						<Iframe src={trailerUrl} />
					</ModalBody>
					<ModalFooter>
						<Button color="danger" outline onClick={() => this.toggleModal()}>Close</Button>
					</ModalFooter>
				</Modal>
				<div className="col-md-4">
					<StickyBox offsetTop={100} offsetBottom={20}>
						<Card cascade>
							<CardImage className="img-fluid" src={"https://image.tmdb.org/t/p/w342/" + this.state.details.poster_path} alt={this.state.details.title} href={"/movies/" + this.props.match.params.id}/>
							<CardBody>
								<Button onClick={() => this.toggleModal()} color="danger" outline>Watch Trailer</Button>
							</CardBody>
						</Card>
					</StickyBox>
				</div>
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-12">
						{favorite_icon}	<h3><strong>{this.state.details.title}</strong>		{year}</h3>
						</div>
						<div className="col-md-4">
							<Fa icon="star" style={{color:"#f5b50a"}} /> {this.state.details.vote_average}/10
						</div>
						<div className="col-md-8">
							<StarRatingComponent name="MovieRating" starCount={10} value={this.state.rating}/>
						</div>
						<hr></hr>
					</div>

							<Nav tabs>
								<NavItem>
									<NavLink className={classnames({active: this.state.activeItem === 1})} onClick={() => this.changeTab(1)}>Overview</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className={classnames({active: this.state.activeItem === 2})} onClick={() => this.changeTab(2)}>Reviews</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className={classnames({active: this.state.activeItem === 3})} onClick={() => this.changeTab(3)}>Similar</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={this.state.activeItem}>
								<TabPane tabId={1}>
									<Row>
										<Col md="12">
										<br></br>
										<p>1</p>
										</Col>
									</Row>
								</TabPane>
								<TabPane tabId={2}>
									<Row>
										<br></br>
										<p>2</p>
									</Row>
								</TabPane>
								<TabPane tabId={3}>
									<SimilarTab data={this.state.details.similar} />
								</TabPane>
							</TabContent>
				</div>
			</div>
		)
	}
}

export default DetailedView
