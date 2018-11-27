import React from 'react'
import axios from 'axios'
import { Card, CardBody,
	CardTitle, Button, CardText } from 'mdbreact';
import 	{NotificationManager} from 'react-notifications'


class ListDetailView extends React.Component {
	state = {
		details: {},
		favorites: {}
	}
	componentDidMount() {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		axios.get("https://api.themoviedb.org/3/list/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language).then(res => {
			this.setState({
				details: res.data
			})
			this.state.details.items.map((item) => {
				axios.get("https://api.themoviedb.org/3/movie/"+ item.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
					const favorites = this.state.favorites
					favorites[item.id] = res.data.favorite
					this.setState({favorites})
				})
			})
			}
		)
	}
	getList = () => {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		axios.get("https://api.themoviedb.org/3/list/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language).then(res => {
			this.setState({
				details: res.data
			})
			this.state.details.items.map((item) => {
				axios.get("https://api.themoviedb.org/3/movie/"+ item.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
					const favorites = this.state.favorites
					favorites[item.id] = res.data.favorite
					this.setState({favorites})
				})
			})
			}
		)
	}
	getFavorites = () => {
		this.state.details.items.map((item) => {
			axios.get("https://api.themoviedb.org/3/movie/"+ item.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
				const favorites = this.state.favorites
				favorites[item.id] = res.data.favorite
				this.setState({favorites})
			})
		})
	}
	handleFavorite = (id) => {
		axios.post("https://api.themoviedb.org/3/account/"+ localStorage.getItem("User").id +"/favorite?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), {
			media_type : "movie",
			media_id: id,
			favorite: !this.state.favorites[id]	
		}).then((res) => {this.getFavorites()})
	}
	handleRemoveFromList = (movieId) => {
		let session = localStorage.getItem("TMDB_session_id")
		let data = {
			media_id: movieId
		}
		axios.post("https://api.themoviedb.org/3/list/" + this.props.match.params.id + "/remove_item?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + session, data).then(res => {
			NotificationManager.success('Movie Removed from current list', "Success")
			this.getList()
		})
	}
	renderMovies = () => {
		if (this.state.details.items) {
			const movies = this.state.details.items.map((item) => {
				let heart_class = "fa-heart"
				if (this.state.favorites[item.id] === true){
					heart_class = "fas " + heart_class
				} else {
					heart_class = "far " + heart_class
				}
				return(
					<div className="row mt-3" key={item.id}>
						<div className="col-sm-2">
						<a href={"/movies/" + item.id}>
							<img src={"https://image.tmdb.org/t/p/w154" + item.poster_path} alt={item.title}/>
						</a>
							<div className="w-100">
							<i className={heart_class} onClick={() => {this.handleFavorite(item.id)}}></i><Button outline color="danger" onClick={() => this.handleRemoveFromList(item.id)}>Remove</Button>
							</div>
						</div>
						<div className="col-sm-5">
							<p>{item.title}</p>
						</div>
						<div className="col-sm-5">
							<p>{item.overview}</p>
						</div>
					</div>	
			)})
			return movies
		}
	}
	render(){
		const movies = this.renderMovies()
		return(
			<div className="container">
			<div className="row mt-5">
				<div className="col">
					<Card>
						<CardBody>
							<CardTitle style={{textAlign:"center"}}>{this.state.details.name}</CardTitle>
							<CardText style={{textAlign:"center", marginBottom:"80px"}}>{this.state.details.description}</CardText>
							{movies}
						</CardBody>
					</Card>
				</div>
			</div>
			</div>
		)
	}
}

export default ListDetailView