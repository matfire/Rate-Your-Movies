import React from 'react'
import { Card, CardImg, CardBody,
	CardTitle } from 'reactstrap';
import axios from 'axios'


class MovieDetail extends React.Component {
	state = {
		details:{}
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
						<a href={"/movies/" + this.props.id}>
						<Card>
							<CardImg top width="100%" src={"https://image.tmdb.org/t/p/w154"+ this.state.details.poster_path}/>
							<CardBody>
								<CardTitle>{this.state.details.original_title}</CardTitle>
							</CardBody>
						</Card>
						</a>
					</div>
			)
	}
}

export default MovieDetail