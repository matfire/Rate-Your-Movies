import React from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import {Col, Carousel, CarouselItem, CarouselInner, Row} from 'mdbreact'

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
					<section className="text-center pt-5 filmtop pb-0 ">
					{!localStorage.getItem("User") && !localStorage.getItem("jwt") && <div className="alert alert-primary" role="alert">Don't forget to connect your <a href="https://www.themoviedb.org/">TMDB</a> account to enjoy all the functionalities of the application</div>}

						<div className="container">
							<h2 className="h5-responsive font-weight-bold text-center text-uppercase white-text pb-5">Playing Now</h2>
							<Carousel activeItem={1} length={6} slide={true} showControls={false} showIndicators={true} multiItem>
								<CarouselInner>
									<Row className="savemeg mb-4">
										{PlayingMovieSliderItems}
									</Row>
								</CarouselInner>
							</Carousel>
						</div>
					</section>
					<div className="container pt-0">
						<div className="row">
							<div className="col-md-8">
								<section className="pt-0">
									<h2 className="h5-responsive font-weight-bold text-center text-uppercase pb-5">Upcoming Movies</h2>
									<Carousel activeItem={1} length={6} slide={true} showControls={false}  showIndicators={true} multiItem>
										<CarouselInner>
										<Row className="savemeg">
												{UpComingMovieSliderItems}
											</Row>
										</CarouselInner>
									</Carousel>
								</section>
							</div>
							<div className="col-md-4">
								<h2 className="h5-responsive font-weight-bold text-center text-uppercase pb-5">SPOTLIGHT CELEBRITIES</h2>
									{this.state.trending_people.map((person, index) => (
										index < 4 && 
											<Row className="mb-2 border border-light" key={person.id}>
												<Col md="3" className="pl-0">
													<a href={"/persons/" + person.id}><img className="img-thumbnail img-fluid" src={"https://image.tmdb.org/t/p/w185" +person.profile_path} alt={person.name}/></a>
												</Col>
												
												<Col md="9" className="align-middle pl-0">
												<p className="font-weight-bold">{person.name}</p>
												
												{person.known_for.map((movie) => (
													<p className="p-0 m-0"><a href={"/movies/" + movie.id} key={movie.id} className="">{movie.title}</a> </p>
												))}
												</Col>
											</Row>
										
									))}
								
							</div>
						</div>
					</div>



					
				
		</React.Fragment>
		)
	}
}

export default HomeView
