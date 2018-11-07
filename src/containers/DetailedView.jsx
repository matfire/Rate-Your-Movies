import React from 'react'
import axios from 'axios'
import MovieSinglePageDetail from '../components/SingleMovieComponents/MovieSinglePageDetail'
import MovieSinglePageHero from '../components/SingleMovieComponents/MovieSinglePageHero'

class DetailedView extends React.Component {
	state = {
		details: [],
		activeTab: '1'
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				details:res.data
			})
		})
	}
	toggle = (tab) => {
		if(this.state.activeTab !== tab)
			this.setState({activeTab:tab})
	}
	render() {
		return(
			<div className="buster-dark">
				<MovieSinglePageHero poster={this.state.details.backdrop_path}/>
				<MovieSinglePageDetail data={this.state.details}/>
			</div>
		)
	}
}

export default DetailedView