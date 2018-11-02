import React from 'react'
import axios from 'axios'
import MovieDetail from '../components/MovieDetail'

class Trending extends React.Component {
	state = {
		data: []
	}

	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
			this.setState({
				data: res.data.results
			})
		})
	}
	render() {
		return(
			<div className="row">
				{this.state.data.map((movie, index) => {
					if (index % 7 == 0) {
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