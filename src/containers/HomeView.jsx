import React from 'react'
import {Jumbotron, Button} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import AliceCarousel from 'react-alice-carousel';
import {Col, Carousel, CarouselItem, CarouselInner, Row} from 'mdbreact'






class HomeView extends React.Component {
	state = {
		movie_upcoming: [],
		movie_playing: []
	}

	createMovieSliderComponents = (data) => {
		let sliderIndex = 1
		let results = []
		if (data.length === 0)
			return([])
		for (let i = 0; i < data.length - 2; i+=3) {
				results.push(
					<CarouselItem itemId={sliderIndex.toString()}>
						<Col md="4">
							<MovieCard data={data[i]} />
						</Col>
						<Col md="4" className="clearfix d-none d-md-block">
							<MovieCard data={data[i+1]} />
						</Col>
						<Col md="4" className="clearfix d-none d-md-block">
							<MovieCard data={data[i+2]} />
						</Col>
					</CarouselItem>
				)
				sliderIndex += 1
			}
		return results
	}

	componentDidMount() {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=2005b3a7fc676c3bd69383469a281eff&language="+ language +"&page=1").then(res => {
			this.setState({movie_upcoming:res.data.results})
		})
		axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=2005b3a7fc676c3bd69383469a281eff&language="+ language +"&page=1").then(res => {
			this.setState({movie_playing:res.data.results})
		})
	}
	render() {
		const PlayingMovieSliderItems = this.createMovieSliderComponents(this.state.movie_playing)
		const UpComingMovieSliderItems = this.createMovieSliderComponents(this.state.movie_upcoming)
		return(
			<React.Fragment>
				<div className="mt-5">
					{!localStorage.getItem("User") && !localStorage.getItem("jwt") && <div className="alert alert-primary" role="alert">Don't forget to connect your <a href="https://www.themoviedb.org/">TMDB</a> account to enjoy all the functionalities of the application</div>}
					<section className="text-center my-5">
						<h2 className="h1-responsive font-weight-bold text-center my-5">Playing Now</h2>
						<Carousel activeItem={1} length={6} slide={true} showIndicators={false} multiItem>
							<CarouselInner>
								<Row>
									{PlayingMovieSliderItems}
								</Row>
							</CarouselInner>
						</Carousel>
					</section>
					<section className="text-center my-5">
						<h2 className="h1-responsive font-weight-bold text-center my-5">Upcoming Movies</h2>
						<Carousel activeItem={1} length={6} slide={true} showIndicators={false} multiItem>
							<CarouselInner>
								<Row>
									{UpComingMovieSliderItems}
								</Row>
							</CarouselInner>
						</Carousel>
					</section>
				</div>
		</React.Fragment>
		)
	}
}

export default HomeView
