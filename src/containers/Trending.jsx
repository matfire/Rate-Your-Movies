import React from 'react'
import axios from 'axios'
import MovieDetail from '../components/MovieDetail'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {NotificationManager} from 'react-notifications';
class Trending extends React.Component {
	state = {
		data: [],
		loading:true
	}

	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
			this.setState({
				data: res.data.results,
				loading:false
			})
		}).catch(err => {
			NotificationManager.error('Something went wrong', 'There is a problem with our server. Please try reloading the page')
			this.setState({loading:false})
		})
	}
	render() {
		return(
			<div className="row">
				<Loading show={this.state.loading} color="green"/>
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

export default Trending