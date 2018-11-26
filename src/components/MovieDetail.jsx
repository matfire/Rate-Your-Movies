import React from 'react'
import axios from 'axios'


class MovieDetail extends React.Component {
	state = {
		details:{},
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				details:res.data
			})
		})
	}
	render() {
		return(
					<div>
						<img src={"https://image.tmdb.org/t/p/w342" + this.state.details.poster_path} alt={this.state.title} />
					</div>
			)
	}
}

export default MovieDetail