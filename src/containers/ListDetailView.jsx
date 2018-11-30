import React from 'react'
import axios from 'axios'
import { Card, CardBody, Button, MDBRow, Spinner } from 'mdbreact';
import 	{NotificationManager} from 'react-notifications'


class ListDetailView extends React.Component {
	state = {
		details: {},
		favorites: {},
		loading:true
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
			this.setState({loading:false})
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
				let heart_class = "fa-heart fa-lg"
				if (this.state.favorites[item.id] === true){
					heart_class = "fas " + heart_class
				} else {
					heart_class = "far " + heart_class
				}
				return(
					<Card className="mb-3">
						<CardBody>
						<div className="row">
						<div className="col-sm-4">
						<a href={"/movies/" + item.id}>
							<img src={"https://image.tmdb.org/t/p/w300" + item.poster_path} alt={item.title}/>
						</a>
							
						</div>
						<div className="col-sm-8 text-left pt-3">
							<h3><i className={heart_class} onClick={() => {this.handleFavorite(item.id)}} style={{color:"red"}}></i> <a href={"/movies/" + item.id}>{item.title}</a></h3>
							<p>{item.overview}</p>
							
							<Button className="ml-0" tag="a" floating  color="red" onClick={() => this.handleRemoveFromList(item.id)}><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></Button>
							
						</div>
						</div>
						</CardBody>
						</Card>
			)})
			return movies
		}
	}
	render(){
		const movies = this.renderMovies()
		if (this.state.loading) {
			return(
			<MDBRow center className="mt-5 pt-5">
			<Spinner blue big />
			</MDBRow>
			)
		}
		return(
			            <div className="container">
			            <div className="row d-flex justify-content-center">
			            <div className="col-md-12 " style={{textAlign:"center"}}>
			                <h1 className="h5-responsive font-weight-bold text-center text-uppercase">{this.state.details.name}</h1>
			                <p className="pb-2">{this.state.details.description}</p>
			            
			                    {movies}
			                        
			                </div>
			            </div>
			            </div>
			        )
	}
}

export default ListDetailView