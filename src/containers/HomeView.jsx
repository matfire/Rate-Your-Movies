import React from 'react'
import {Jumbotron, Button} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MovieDetail from '../components/MovieDetail'







class HomeView extends React.Component {
	state = {
		query: "",
		results: []
	}

	handleInputChange = (e) => {
		this.setState({
		  query: e.target.value
		}, () => {
			if (this.state.query && this.state.query.length > 3) {
				if (this.state.query.length % 2 === 0) {
				  this.getInfo()
				}
			}
		})
	}

	getInfo = () => {
		axios.get("https://api.themoviedb.org/3/search/movie?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&query="+ this.state.query + "&page=1&include_adult=false").then(res => {
			this.setState({
				results: res.data.results
			})
		})
	}
	render() {
		return(
			<React.Fragment>
				<div className="slider movie-items">
				</div>
				<div className="movie-items">
					<div className="container">
						<div className="row ipad-width">
							<div className="col-md-8">
								<div className="title-hd">
									<h2>IN THEATER</h2>
								</div>
							</div>
							<div className="col-md-4"></div>
						</div>
					</div>
				</div>
		</React.Fragment>
		)
	}
}

export default HomeView
