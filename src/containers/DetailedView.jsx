import React from 'react'
import axios from 'axios'
import { Card, CardText, CardBody,
	CardTitle } from 'reactstrap'



class DetailedView extends React.Component {
	state = {
		details: [],
		reviews: []
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				details:res.data
			})
		})
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id +"/reviews?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				reviews: res.data.results
			})
		})
	}

	renderReviews = () => {
		return(
			this.state.reviews.map((r) => (
				<React.Fragment>
				<div className="row mt-3" key={r.id}>
					<div className="col-sm-2">
						<p>{r.author}</p>
					</div>
					<div className="col-sm-10">
						<p>{r.content}</p>
					</div>
				</div>
				<hr></hr>
				</React.Fragment>
		)))
	}
	render() {
		const reviews = this.renderReviews()
		return(
			<div>
				<div className="row">
					<div className="col-sm-4 mt-5">
						<img src={"https://image.tmdb.org/t/p/w342"+ this.state.details.poster_path} alt={this.state.details.original_title}/>
					</div>
					<div className="col-sm-8 mt-5">
						<Card>
							<CardBody>
								<CardTitle>{this.state.details.original_title}</CardTitle>
								<CardText>

								</CardText>
							</CardBody>
						</Card>
					</div>
				</div>
				<div id="reviews" className="mt-5">
				{reviews}
				</div>
			</div>
		)
	}
}

export default DetailedView