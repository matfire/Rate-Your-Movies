import React from 'react'
import axios from 'axios'

class PersonalLists extends React.Component {
	state = {
		lists: [],
		page: 1,
		total_pages: 1
	}
	
	componentDidMount() {
		const User = localStorage.getItem("User")
		axios.get("https://api.themoviedb.org/3/account/" + User.id  + "/lists?api_key=2005b3a7fc676c3bd69383469a281eff&language=en-US&session_id=" + localStorage.getItem("TMDB_session_id") + "&page=1").then(res => {
			this.setState({
				lists:res.data.results
			})
			console.log(res.data)
		}).catch(err => {console.log(err)})
	}
	render() {
		return(
			<ul>
			</ul>
		)
	}
}

export default PersonalLists