import React from 'react'
import {Jumbotron, Button} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MovieDetail from '../components/MovieDetail'
import AliceCarousel from 'react-alice-carousel';







class HomeView extends React.Component {
	state = {
		movie_trending: [],
		movie_playing: []
	}

	createMovieSliderComponents = (data) => {
		const results = data.map((movie) => (
			<div className="movie-item" style={{width:"224px"}}>
				<div className="mv-img">
					<a href={"/movies/" + movie.id}>
						<img src={"https://image.tmdb.org/t/p/w342" + movie.poster_path} alt={movie.title} widht={285} height={437} />
					</a>
				</div>
				<div>
					<div className="title-in">
						<h6><a href={"/movies/"+movie.id}>{movie.title}</a></h6>
						<p><i className="ion-android-star"></i><span>{movie.vote_average}</span>/10</p>
					</div>
				</div>
			</div>
		))
		return results
	}
	createPlayingMovieSliderComponents = () => {
		const res = this.state.movie_playing.map((movie) => (
				<div className="slide-it slick-slide slick-cloned" style={{width: "192px"}}>
					<div className="movie-item">
						<div className="mv-img">
							<img src={"https://image.tmdb.org/t/p/w342" + movie.poster_path} alt={movie.title} widht={185} height={284} />
						</div>
						<div class="hvr-inner">
					  	<a href={"/movies/" + movie.id}> Read more <i className="ion-android-arrow-dropright"></i> </a>
					  </div>
						<div className="title-in">
							<h6><a href={"/movies/" + movie.id}>{movie.title}</a></h6>
							<p><i className="ion-android-star"></i><span>{movie.vote_average}</span>/10</p>
						</div>
					</div>
				</div>
		))
		return res
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
			this.setState({movie_trending:res.data.results})
		})
		axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&page=1").then(res => {
			this.setState({movie_playing:res.data.results})
		})
	}
	render() {
		const TrendingMovieSliderItems = this.createMovieSliderComponents(this.state.movie_trending)
		const PlayingMovieSliderItems = this.createPlayingMovieSliderComponents(this.state.movie_playing)
		return(
			<React.Fragment>
				<div className="slider movie-items mt-5">
					<div className="container">
						<AliceCarousel items={TrendingMovieSliderItems} duration={1000} responsive={{0:{items:1}, 1024:{items:3}}} autoPlay={true} buttonsDisabled={true} mouseDragEnabled stagePadding={{paddingLeft:0, paddingRight:0}}/>
					</div>
				</div>
				<div className="movie-items">
					<div className="container">
						<div className="row ipad-width">
							<div className="col-md-8">
								<div className="title-hd"><h2>IN THEATERS NOW</h2></div>
											<div className="row">
												<AliceCarousel items={PlayingMovieSliderItems} autoPlay={false} buttonsDisabled={true} mouseDragEnabled responsive={{0:{items:1}, 1024:{items:4}}} />
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
