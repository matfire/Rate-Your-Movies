import React from 'react'
import axios from 'axios'
import {Table} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import { insertGlobal } from 'glamor';
class PersonalLists extends React.Component {
	state = {
		lists: [],
		page: 1,
		total_pages: 1
	}
	
	componentDidMount() {
		const User = localStorage.getItem("User")
		const session = localStorage.getItem("TMDB_session_id")
		if (session) {
		axios.get("https://api.themoviedb.org/3/account/" + User.id  + "/lists?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&session_id=" + localStorage.getItem("TMDB_session_id") + "&page=1").then(res => {
			this.setState({
				lists:res.data.results
			})
		}).catch(err => {console.log(err)})
	}
	}
	render() {
		const session = localStorage.getItem("TMDB_session_id")
		if (!session) {
			return(<Redirect to="/" />)
		}
		return(
			<div className="mt-5">
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Poster</th>
						</tr>
					</thead>
					<tbody>
						{this.state.lists.map((list) => (
							<tr key={list.id}>
								<th scope="row"><a href={"/list/" + list.id}>{list.name}</a></th>
								<th>{list.description}</th>
								<th><img src={"https://image.tmdb.org/t/p/w154"+ list.poster_path} alt={list.name}/></th>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		)
	}
}

export default PersonalLists