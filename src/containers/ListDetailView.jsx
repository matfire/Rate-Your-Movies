import React from 'react'
import axios from 'axios'
import { Card, CardImg, CardBody,
	CardTitle, CardSubtitle } from 'reactstrap';
class ListDetailView extends React.Component {
	state = {
		details: {},
		favorites: {}
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/list/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
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
						<div className="col-sm-4">
						<a href={"/movies/" + item.id}>
							<img src={"https://image.tmdb.org/t/p/w154" + item.poster_path} alt={item.title}/>
						</a>
							<div className="w-100">
							<i className={heart_class} onClick={() => {this.handleFavorite(item.id)}}></i>
							</div>
						</div>
						<div className="col-sm-5">
							<p>{item.title}</p>
						</div>
						<div className="col-sm-3">
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
			<div className="row mt-5">
				<div className="col">
					<Card>
						<CardImg src={"https://image.tmdb.org/t/p/w154"+ this.state.details.poster_path} />
						<CardBody>
							<CardTitle>{this.state.details.name}</CardTitle>
							<CardSubtitle>{this.state.details.description}</CardSubtitle>
							{movies}
						</CardBody>
					</Card>
				</div>
			</div>
		)
	}
}

export default ListDetailView