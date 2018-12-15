import React from 'react'
import axios from 'axios'
import {Nav, Row, Col, Fa} from 'mdbreact';
import classnames from 'classnames';
import { ListGroup, ListGroupItem, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption, TabPane, TabContent, NavItem, NavLink} from 'mdbreact'
import StickyBox from "react-sticky-box";
import { Button, Card, CardBody, CardImage, Iframe, Modal, ModalBody, ModalHeader, ModalFooter, Spinner, toast, MDBRow } from 'mdbreact';
import StarRatingComponent from 'react-star-rating-component';
import Truncate from 'react-truncate';

const ActorItem = (props) => {
	return(
		<React.Fragment>
			<div className="clearfix  mb-2">
			<a href={"/persons/" + props.data.id}><img src={"https://image.tmdb.org/t/p/w45" + props.data.profile_path} className=" z-depth-1 float-left mr-3" alt={props.data.name} /></a>
			<p className="pt-3"><a href={"/persons/" + props.data.id}><strong>{props.data.name}</strong></a> <em>as </em>{props.data.character}</p>
			</div>
		</React.Fragment>
			
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

class OverviewTab extends React.Component {

	renderCast = () => {
		let result = []
		if (this.props.data.credits.cast) {
			result = this.props.data.credits.cast.map((actor, index) => (
				index < 10 && <ActorItem data={actor} />
			))
		}

		return result
	}
	render() {
		return(
			<p>{this.props.data.overview}</p>
		)
	}
}

const ReviewsTab = (props) => (
	<React.Fragment>
	{props.data.reviews.results.length === 0 && <p>Sorry, no reviews available at the moment</p>}
	{props.data.reviews.results.length > 0 && <ListGroup>
		{props.data.reviews.results.map((review) => (
			<ListGroupItem key={review.id}>{review.content}<br /><br /><em>by {review.author}</em></ListGroupItem>
		))}
	</ListGroup>}
	</React.Fragment>
)

const CrewItem = (props) => {
	return(
		
			<p className="m-2 p-0" style={{lineHeight: "1em"}}>{props.data.name} - <em>{props.data.job}</em></p> 
			
	)
}
const CastCrewTab = (props) => {
	let CrewSort = [].concat(props.data.crew).sort((a, b) => a.department > b.department)
	return (
		<React.Fragment>
			<Row className="mt-2">
			<Col md="6">
			<h6 className="mb-4">CAST</h6>
			
			{props.data.cast.lengh === 0 && <p>Sorry, no info regarding cast available at the moment</p>}
			{props.data.cast.length > 0 && props.data.cast.map((actor) => (
				<ActorItem key={actor.id + 1} data={actor} />
				))}
			</Col>
			<Col md="6">
			<h6 className="mb-4">CREW</h6>
			{CrewSort.length === 0 && <p>Sorry, no info regarding crew available at the moment</p>}
			{CrewSort.length > 0 && CrewSort.map((crew) => (
					<CrewItem data={crew} key={crew.id + 2}/>
				))}
			</Col>
			</Row>
		
		</React.Fragment>
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
		axios.get("https://tmdb.dev.matteogassend.com/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language + "&append_to_response=credits,videos,images,similar,reviews").then(res => {
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
			return("far fa-heart fa-2x ")
		}
		return("fa fa-heart fa-2x ")
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
			<MDBSelectOption key={item.id} value={item.id}>{item.name}</MDBSelectOption>
		))
		return result
	}
	setSelectedList = (e) => {
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
				<MDBRow center className="mt-5 pt-5">
					<Spinner blue big />
				</MDBRow>
			)
		}
		return(
			<div className="container">
			<div className="row mt-5">
				<Modal isOpen={this.state.trailerModal} toggle={() => this.toggleModal()} centered size="lg">
					<ModalHeader toggle={() => this.toggleModal()}>Trailer for {this.state.details.title}</ModalHeader>
					<ModalBody>
						<Iframe src={trailerUrl} />
					</ModalBody>
					<ModalFooter>
						<Button color="blue-grey" outline onClick={() => this.toggleModal()}>Close</Button>
					</ModalFooter>
				</Modal>
				<Modal isOpen={this.state.listModal} toggle={this.toggleListModal} centered>
				<ModalHeader className="cyan white-text" toggle={this.toggleListModal}>Add {this.state.details.title} to a list</ModalHeader>
					<ModalBody>
						<MDBSelect getValue={this.setSelectedList}>
						<MDBSelectInput selected="Choose a list"  />
						<MDBSelectOptions>
							<MDBSelectOption disabled>Select a list</MDBSelectOption>
							{listObjects}
						</MDBSelectOptions>
						</MDBSelect>
					</ModalBody>
					<ModalFooter className="border-0 mt-0 pt-0">
						<Button color="cyan" onClick={this.addMovieToList}>Submit</Button>
						<Button color="blue-grey" outline onClick={this.toggleListModal}>Close</Button>
					</ModalFooter>
				</Modal>
				<div className="col-md-4 ">
					<StickyBox offsetTop={50} offsetBottom={20}>
						<Card cascade className="ml-2 mr-2">
							<CardImage className="img-fluid" src={"https://image.tmdb.org/t/p/w342/" + this.state.details.poster_path} alt={this.state.details.title} href={"/movies/" + this.props.match.params.id}/>
							<CardBody className="text-center">
								<i className={favorite_icon} onClick={this.toggleFavorite} /> <br />
								
								{ localStorage.getItem("User") && localStorage.getItem("TMDB_session_id") && <Button color="cyan" outline onClick={this.toggleListModal}  >Add to List</Button>}<br />
								{ trailerUrl && <Button onClick={() => this.toggleModal()} color="cyan" >Watch Trailer</Button>} 
							</CardBody>
						</Card>
					</StickyBox>
				</div>
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-12">
							<h1 className="h2-responsive"><strong>{this.state.details.title}</strong>	|	<small>{year}</small></h1>
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
							<Nav classicTabs className="nav-justified">
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
									<NavLink to="#" className={classnames({active: this.state.activeItem === 4})} onClick={() => this.changeTab(4)}>Cast & Crew</NavLink>
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
									<CastCrewTab data={this.state.details.credits} />
								</TabPane>
							</TabContent>
						</div>
				</div>
			</div>
			</div>
		)
	}
}

export default DetailedView
