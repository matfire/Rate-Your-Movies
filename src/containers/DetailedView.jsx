import React from 'react'
import axios from 'axios'
import MovieSinglePageDetail from '../components/SingleMovieComponents/MovieSinglePageDetail'
import MovieSinglePageHero from '../components/SingleMovieComponents/MovieSinglePageHero'

class DetailedView extends React.Component {
	state = {
		details: [],
		activeTab: '1'
	}
	getData = () => {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&append_to_response=credits,videos,images,similar,reviews").then(res => {
			this.setState({
				details:res.data
			})
		})
	}
	render() {
		if (this.state.details.length === 0) {
			this.getData()
		}
		return(
			<div className="buster-dark">
				<MovieSinglePageHero poster={this.state.details.backdrop_path}/>
				<MovieSinglePageDetail data={this.state.details}/>
			</div>
		)
	}
}

export default DetailedView