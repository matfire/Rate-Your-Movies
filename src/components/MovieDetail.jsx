import React from 'react'
import { Card, CardImg, CardBody,
	CardTitle, CardSubtitle } from 'reactstrap';
import axios from 'axios'


class MovieDetail extends React.Component {
	state = {
		details:{},
		favorite: false
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				details:res.data
			})
			const session = localStorage.getItem("TMDB_session_id")
			if (session) {
				axios.get("https://api.themoviedb.org/3/movie/"+ this.props.id + "/account_states?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
					this.setState({favorite: res.data.favorite})
				})
			}
		})
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
			return (
				<CardSubtitle><i className={heart_class} onClick={() => {this.handleFavorite(this.props.id)}}></i></CardSubtitle>
			)
		}
	}
	render() {
		let heart_class = "fa-heart"
		if (this.state.favorite === true){
			heart_class = "fas " + heart_class
		} else {
			heart_class = "far " + heart_class
		}
		const render_favorite = this.renderFavorite(heart_class)
		return(
					<div>
						<Card>
							<a href={"/movies/" + this.props.id}>
								<CardImg top width="100%" src={"https://image.tmdb.org/t/p/w154"+ this.state.details.poster_path}/>
							</a>
							<CardBody>
								<CardTitle>{this.state.details.title}</CardTitle>
								{render_favorite}
							</CardBody>
						</Card>
					</div>
			)
	}
}

export default MovieDetail