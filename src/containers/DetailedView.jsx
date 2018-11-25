import React from 'react'
import axios from 'axios'
import {Nav, Row, Col, Fa} from 'mdbreact';
import {Input, CardText} from 'reactstrap'
import classnames from 'classnames';
import { ListGroup, ListGroupItem, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption, TabPane, TabContent, NavItem, NavLink, CardGroup} from 'mdbreact'
import StickyBox from "react-sticky-box";
import { Button, Card, CardBody, CardImage, Iframe, Modal, ModalBody, ModalHeader, ModalFooter, Spinner, toast } from 'mdbreact';
import StarRatingComponent from 'react-star-rating-component';
import Truncate from 'react-truncate';
import Lightbox from 'react-image-lightbox';

require ('mdbreact/docs/pages/pro/Lightbox.css');



const ActorItem = (props) => {
	return(
		<Row className="mt-2">
			<Col md="2">
				<img src={"https://image.tmdb.org/t/p/w45" + props.data.profile_path} className="img-fluid" alt={props.data.name} style={{borderRadius:"50%"}}/>
			</Col>
			<Col md="10">
				<h6>{props.data.name} as {props.data.character}</h6>
			</Col>
		</Row>
	)
}


class SimilarTab extends React.Component {
	getSimilars = () => {
		if (this.props.data) {
			if (this.props.data.total_results === 0) {
				return(<p>Sorry, no related movies were found</p>)
			}
		const result = this.props.data.results.map((movie, index) => {
			if (index < 4) {
				let year = movie.release_date.substring(0,4)
			return(
			<React.Fragment key={movie.id}>
			<div className="row mt-2 mb-2" >
				<div className="col-md-4">
					<a href={"/movies/" + movie.id}>
						<img className="img-fluid" src={"https://image.tmdb.org/t/p/w342/" + movie.poster_path} alt={movie.title} />
					</a>
				</div>

				<div className="col-md-8">
					<h4>{movie.title}({year})</h4>
					<Fa icon="star" style={{color:"#f5b50a"}} /> {movie.vote_average}/10<br></br>
					<Truncate lines={3}>{movie.overview}</Truncate>
					<hr></hr>
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

class OverviewTab extends React.Component {

	renderCast = () => {
		let result = []
		if (this.props.data.credits.cast) {
			result = 		this.props.data.credits.cast.map((actor, index) => (
				index < 10 && <ActorItem data={actor} />
			))
		}

		return result
	}
	render() {
		const cast = this.renderCast()
		return(
			<div className="row mt-2">
						<p>{this.props.data.overview}<br></br>
						<hr></hr>
						<strong>Cast</strong>   <span onClick={() => this.props.updateTab(5)}>See more</span><br></br>
						{cast}
						<br></br>
						<hr></hr>
						<strong>Reviews</strong>   <span onClick={() => this.props.updateTab(2)}>See More</span></p>
						{this.props.data.reviews.results.length === 0 && <p>Sorry, no reviews are available at the moment</p>}
						{this.props.data.reviews.results.length > 0 && <ListGroup>
							{this.props.data.reviews.results.map((review, index) => (
								index < 4 && <ListGroupItem key={review.id}>{review.content}<br></br>by {review.author}</ListGroupItem>
							))}
						</ListGroup>}
			</div>
		)
	}
}

const ReviewsTab = (props) => (
	<Row>
	{props.data.reviews.results.length === 0 && <p>Sorry, no reviews available at the moment</p>}
	{props.data.reviews.results.length > 0 && <ListGroup>
		{props.data.reviews.results.map((review) => (
			<ListGroupItem key={review.id}>{review.content}<br></br>by {review.author}</ListGroupItem>
		))}
	</ListGroup>}
	</Row>
)

const CrewItem = (props) => {
	return(
		<Row className="mt-2">
			{/* <Col md="2">
				<img src={"https://image.tmdb.org/t/p/w45" + props.data.profile_path} className="img-fluid" alt={props.data.name} style={{borderRadius:"50%"}}/>
			</Col> */}
			<Col md="4">
				<h6>{props.data.name}</h6>
			</Col>
			<Col md="8">
				<h6>{props.data.job}</h6>
			</Col>
		</Row>
	)
}
const CastCrewTab = (props) => {
	let CrewSort = [].concat(props.data.crew).sort((a, b) => a.department > b.department)
	return (
		<Row>
			<Col>
			<h3>Cast</h3><br></br>
			</Col>
			{props.data.cast.lengh === 0 && <p>Sorry, no info regarding cast available at the moment</p>}
			{props.data.cast.length > 0 && <ListGroup>
				{props.data.cast.map((actor) => (
					<ListGroupItem href={"/person/" + actor.id} key={actor.id}><ActorItem data={actor} /></ListGroupItem>
				))}
			</ListGroup>}
			<Col>
			<h3>Crew</h3>
			{CrewSort.length === 0 && <p>Sorry, no info regarding crew available at the moment</p>}
			{CrewSort.length > 0 && <ListGroup>
				{CrewSort.map((crew) => (
					<ListGroupItem key={crew.id}><CrewItem data={crew} /></ListGroupItem>
				))}
			</ListGroup>}
			</Col>
		</Row>
	)
}
class DetailedView extends React.Component {
	state = {
		details: [],
		states: {},
		activeItem: 1,
		trailerModal: false,
		listModal: false,
		listSelectedId: "",
		listItems: [],
		rating: 0,
		loading:true,
	}
	getLists = () => {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		let session = localStorage.getItem("TMDB_session_id")
		if (session && User) {
			axios.get("https://api.themoviedb.org/3/account/" + User.id + "/lists?api_key=2005b3a7fc676c3bd69383469a281eff&session_id="+ session +"&language=" + language + "&page=1").then(res => {
				this.setState({
					listItems: res.data.results
				})
			})
		}
	}
	getData = () => {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language + "&append_to_response=credits,videos,images,similar,reviews").then(res => {
			this.setState({
				details:res.data,
				loading:false
			})
		})
		this.getLists()
		this.getStates()
	}
	getStates = (ratingValue) => {
		let session = localStorage.getItem("TMDB_session_id")
		if (session){
			axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
				this.setState({states: res.data})
				this.setState({rating: ratingValue || this.state.states.rated["value"]})
			})
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
		axios.post("https://api.themoviedb.org/3/account/" + User.id + "/favorite?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), data).then(res => {
			this.getStates()
		})
	}
	checkFavorite = () => {
		let session = localStorage.getItem("TMDB_session_id")
		if (!session){
			return
		}
		if(this.state.states.favorite === false) {
			return("far fa-heart")
		}
		return("fa fa-heart")
	}
	handleRatingChange = (nextValue, prevValue, name) => {
		axios.post("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "/rating?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), {
			value: nextValue
		}).then(res => {
				this.getStates(nextValue)
			})
	}
	toggleListModal = () => {
		this.setState({
			listModal: !this.state.listModal
		})
	}
	getListOptions = () => {
		let result = this.state.listItems.map((item) => (
			<MDBSelectOption key={item.id} value={item.id}>{item.title}</MDBSelectOption>
		))
		return result
	}
	setSelectedList = (e) => {
		console.log(e)
		this.setState({
			listSelectedId: e})
	}
	addMovieToList = () => {
		let data = {
			media_id : this.state.details.id
		}
		axios.post("https://api.themoviedb.org/3/list/" + this.state.listSelectedId +"/add_item?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), data).then(res => {
			toast.success(this.state.details.title + " successfully added to list", "Success")
			this.toggleListModal()
		})
	}
	render() {
		if (this.state.details.length === 0) {
			this.getData()
		}
		let year = this.state.details.release_date
		let favorite_icon = this.checkFavorite()
		let trailerUrl = ""
		let listObjects = this.getListOptions()
		if(year) {
		  year = year.substring(0, 4)
		  trailerUrl = this.getTrailerUrl()
		}
		if (this.state.loading === true) {
			return(
				<div className="row mt-5">
					<Spinner blue big />
				</div>
			)
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
				<Modal isOpen={this.state.listModal} toggle={this.toggleListModal} centered>
					<ModalHeader toggle={this.toggleListModal}>Add {this.state.details.title} to a list</ModalHeader>
					<ModalBody>
						<MDBSelect getValue={this.setSelectedList}>
						<MDBSelectInput selected="Choose a list"  />
						<MDBSelectOptions>
							<MDBSelectOption disabled>Select a list</MDBSelectOption>
							{listObjects}
						</MDBSelectOptions>
						</MDBSelect>
					</ModalBody>
					<ModalFooter>
						<Button color="success" outline onClick={this.addMovieToList}>Submit</Button>
						<Button color="danger" outline onClick={this.toggleListModal}>Close</Button>
					</ModalFooter>
				</Modal>
				<div className="col-md-4">
					<StickyBox offsetTop={100} offsetBottom={20}>
						<Card cascade>
							<CardImage className="img-fluid" src={"https://image.tmdb.org/t/p/w342/" + this.state.details.poster_path} alt={this.state.details.title} href={"/movies/" + this.props.match.params.id}/>
							<CardBody>
								<i className={favorite_icon} onClick={this.toggleFavorite} />
								{ trailerUrl && <Button onClick={() => this.toggleModal()} color="danger" outline>Watch Trailer</Button>}
								{ localStorage.getItem("User") && localStorage.getItem("TMDB_session_id") && <Button color="primary" outline onClick={this.toggleListModal}>Add to List</Button>}
							</CardBody>
						</Card>
					</StickyBox>
				</div>
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-12">
							<h3><strong>{this.state.details.title}</strong>		<small>{year}</small></h3>
						</div>
						<br></br>
						<div className="col-md-2 mt-2">
							<p> <Fa icon="star" style={{color:"#f5b50a"}} size="2x"/>{this.state.details.vote_average}/10</p>
						</div>
						<div className="col-md-8" style={{fontSize:"32px"}}>
							{localStorage.getItem("TMDB_session_id") && <StarRatingComponent name="MovieRating" starCount={10} value={this.state.rating} onStarClick={this.handleRatingChange}/>}
						</div>
						<hr></hr>
					</div>
						<div className="classic-tabs">
							<Nav classicTabs className="nav-justified" color="blue">
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeItem === 1})} onClick={() => this.changeTab(1)}>Overview</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeItem === 2})} onClick={() => this.changeTab(2)}>Reviews</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeItem === 3})} onClick={() => this.changeTab(3)}>Similar</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeItem === 4})} onClick={() => this.changeTab(4)}>Media</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to="#" className={classnames({active: this.state.activeItem === 5})} onClick={() => this.changeTab(5)}>Cast & Crew</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeItem={this.state.activeItem} className="card">
								<TabPane tabId={1}>
									<OverviewTab data={this.state.details} updateTab={this.changeTab}/>
								</TabPane>
								<TabPane tabId={2}>
									<ReviewsTab data={this.state.details} />
								</TabPane>
								<TabPane tabId={3}>
									<SimilarTab data={this.state.details.similar} />
								</TabPane>
								<TabPane tabId={4}>
								</TabPane>
								<TabPane tabId={5}>
									<CastCrewTab data={this.state.details.credits} />
								</TabPane>
							</TabContent>
						</div>
				</div>
			</div>
		)
	}
}

export default DetailedView
