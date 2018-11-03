import React from 'react'
import axios from 'axios'
import { Card, CardText, CardBody,
	CardTitle } from 'reactstrap'



class DetailedView extends React.Component {
	state = {
		details: []
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US").then(res => {
			this.setState({
				details:res.data
			})
		})
	}
	render() {
		return(
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
		)
	}
}

export default DetailedView