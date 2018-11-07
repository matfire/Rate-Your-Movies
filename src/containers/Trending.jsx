import React from 'react'
import MovieGridPage from '../components/MovieGridComponents/MovieGridPage'
import 'react-loading-bar/dist/index.css'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';
class Trending extends React.Component {
	state = {
		data: [],
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
				<MovieGridPage data={this.state.data}/>
		)
	}
}

export default Trending