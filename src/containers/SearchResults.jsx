import React from 'react'
import axios from 'axios'
import MovieDetail from '../components/MovieDetail'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {NotificationManager} from 'react-notifications';

class SearchResults extends React.Component {
	state = {
		data: [],
		loading: true
	}
	componentDidMount() {
		if (this.props.query) {
			axios.get("https://api.themoviedb.org/3/search/movie?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&query=" + this.props.query + "&page=1&include_adult=false").then(res => {
				this.setState({
					data: res.data.results,
					loading:false
				})
			}).catch(err => {
				NotificationManager.error('Something went wrong', 'There is a problem with our server. Please try reloading the page')
				this.setState({loading:false})
		})
	}
	}
	componentDidUpdate() {
		if (this.props.query) {
			axios.get("https://api.themoviedb.org/3/search/movie?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&query=" + this.props.query + "&page=1&include_adult=false").then(res => {
				this.setState({
					data: res.data.results,
					loading:false
				})
			}).catch(err => {
				NotificationManager.error('Something went wrong', 'There is a problem with our server. Please try reloading the page')
				this.setState({loading:false})
		})
		} else if (this.state.loading) {
			this.setState({loading:false})
		}
	}
	render() {
		return(
			<div className="row">
				<Loading show={this.state.loading} color="green"/>
				<p>{this.props.query}</p>
				{this.state.data.map((movie, index) => {
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

export default SearchResults