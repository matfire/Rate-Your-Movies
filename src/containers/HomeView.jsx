import React from 'react'
import {Jumbotron, Input, Button} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MovieDetail from '../components/MovieDetail'

class SearchResults extends React.Component {
	render() {
		return(
			<div className="row">
			{this.props.data.map((movie, index) => {
				if (index > 10)
					return
				if (index % 7 === 0) {
					return(
						<React.Fragment>
						<div className="w-100"></div>
						<br></br>
							<div className="col">
								<MovieDetail key={movie.id} id={movie.id} />
							</div>
						</React.Fragment>
					)
				}
				return(
					<div className="col">
						<MovieDetail key={movie.id} id={movie.id} />
					</div>)
			})}
		</div>
		)
	}
}



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
			<div className="mt-5">
				<Jumbotron>
					<div className="row">
						<div className="col-sm-5">
							<Input onChange={this.handleInputChange} placeholder="Start looking for a movie"/>
						</div>
						<div className="col-sm-1">
							<p><strong>OR</strong></p>
						</div>
						<div className="col-sm-6">
						<Link to="/trending" style={{color: "inherit"}}><Button color="success"><i className="fas fa-trophy"></i>    Look at Trending Movies</Button></Link>
						</div>
					</div>
					<SearchResults data={this.state.results} />
				</Jumbotron>
			</div>
		)
	}
}

export default HomeView