import React from 'react'
import axios from 'axios'
import {Nav, Row, Col, Fa} from 'mdbreact';
import {TabPane, TabContent, NavItem, NavLink, Input, CardText} from 'reactstrap'
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'mdbreact'
import StickyBox from "react-sticky-box";
import { Button, Card, CardBody, CardImage, Iframe, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import StarRatingComponent from 'react-star-rating-component';
import Truncate from 'react-truncate';
import {AtomSpinner} from 'react-epic-spinners'
import { NotificationManager } from 'react-notifications';

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
			<ListGroupItem key={movie.id}>
			<div className="row">
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

class OverviewTab extends React.Component {
	renderImages = () => {

	}
	render() {
		const images = this.renderImages()
		return(
			<div className="row mt-2">
				<Card>
					<CardBody>
						<CardText>{this.props.data.overview}</CardText>
						<CardText><strong>Videos & Photos</strong><span style={{marginLeft: "10px"}} onClick={() => this.props.updateTab(4)}>See all</span></CardText>
							{images}
						<CardText><strong>Cast</strong></CardText>
						<CardText><strong>Reviews</strong></CardText>
					</CardBody>
				</Card>
			</div>
		)
	}
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
		let session = localStorage.getItem("TMDB_session_id")
		if (session && User) {
			axios.get("https://api.themoviedb.org/3/account/" + User.id + "/lists?api_key=2005b3a7fc676c3bd69383469a281eff&session_id="+ session +"&language=en-US&page=1").then(res => {
				this.setState({
					listItems: res.data.results
				})
			})
		}
	}
	getData = () => {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&append_to_response=credits,videos,images,similar,reviews").then(res => {
			this.setState({
				details:res.data,
				loading:false
			})
		})
		this.getLists()
		this.getStates()
	}
	getStates = () => {
		let session = localStorage.getItem("TMDB_session_id")
		if (session){
			axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
				this.setState({states: res.data})
				this.setState({rating: this.state.states.rated["value"]})
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
				this.getStates()
			})
	}
	toggleListModal = () => {
		this.setState({
			listModal: !this.state.listModal
		})
	}
	getListOptions = () => {
		let result = this.state.listItems.map((item) => (
			<option key={item.id} value={item.id}>{item.title}</option>
		))
		return result
	}
	setSelectedList = (e) => {
		this.setState({
			listSelectedId: e.target.value
		})
	}
	addMovieToList = () => {
		let data = {
			media_id : this.state.details.id
		}
		axios.post("https://api.themoviedb.org/3/list/" + this.state.listSelectedId +"/add_item?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), data).then(res => {
			NotificationManager.success(this.state.details.title + " successfully added to list", "Success")
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
					<div className="col-md-12" style={{textAlign:"center"}}>
						<AtomSpinner color="blue" />
					</div>
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
						<Input type="select" onChange={this.setSelectedList} value={this.state.listSelectedId}>
							<option active>Select a list</option>
							{this.state.listItems.map((item) => (
								<option key={item.id} value={item.id}>{item.name}</option>
							))}
						</Input>
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
								<Button onClick={() => this.toggleModal()} color="danger" outline>Watch Trailer</Button>
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
								<NavItem>
									<NavLink className={classnames({active: this.state.activeItem === 4})} onClick={() => this.changeTab(4)}>Media</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={this.state.activeItem}>
								<TabPane tabId={1}>
									<OverviewTab data={this.state.details} updateTab={this.changeTab}/>
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
