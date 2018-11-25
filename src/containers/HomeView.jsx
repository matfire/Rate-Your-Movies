import React from 'react'
import {Jumbotron, Button} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import AliceCarousel from 'react-alice-carousel';
import {Col, Carousel, CarouselItem, CarouselInner, Row, ListGroup, ListGroupItem, Fa} from 'mdbreact'






class HomeView extends React.Component {
	state = {
		movie_upcoming: [],
		movie_playing: [],
		trending_people: []
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
		axios.get("https://api.themoviedb.org/3/trending/person/day?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
			this.setState({trending_people: res.data.results})
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
					<Row>
						<Col md="8">
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
						</Col>
						<Col md="4">
							<h2 className="text-center">SPOTLIGHT CELEBRITIES</h2>
							<hr></hr>
							<ListGroup>
								{this.state.trending_people.map((person, index) => (
									index < 4 && <ListGroupItem key={person.id}>
										<Row>
											<Col md="4">
												<img src={"https://image.tmdb.org/t/p/w185" +person.profile_path} alt={person.name} className="img-fluid" />
												<p>{person.name}</p>
											</Col>
											<Col md="2">
												known for
											</Col>
											<Col md="6">
												<ListGroup>
												{person.known_for.map((movie) => (
													<ListGroupItem href={"/movies/" + movie.id} key={movie.id}  style={{color:"inherit"}}>{movie.title}</ListGroupItem>
												))}
												</ListGroup>
											</Col>
										</Row>
									</ListGroupItem>
								))}
							</ListGroup>
							<a href="/people" style={{color:"inherit"}}><h4 className="text-center">See al celebrities <Fa icon="arrow-circle-right" /></h4></a>
						</Col>
					</Row>
				</div>
		</React.Fragment>
		)
	}
}

export default HomeView
