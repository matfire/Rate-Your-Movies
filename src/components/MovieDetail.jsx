import React from 'react'
import {AppContext} from '../App'
import { Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button } from 'reactstrap';
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
		<AppContext.Consumer>
			{(context) => {
				return(
					<div>
						<Card>
							<CardImg top width="100%" src={"https://image.tmdb.org/t/p/w154"+ this.state.details.poster_path}/>
							<CardBody>
								<CardTitle>{this.state.details.original_title}</CardTitle>
							</CardBody>
						</Card>
					</div>
			)}}
		</AppContext.Consumer>
		)
	}
}

export default MovieDetail