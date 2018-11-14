import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
class LoginView extends React.Component {

	state = {
		request_token : ""
	}

	componentDidMount() {
		const token = localStorage.getItem('request_token')
		if (!token) {
			axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
				this.setState({
					request_token: res.data.request_token
				})
				localStorage.setItem('request_token', this.state.request_token)
				window.location = "https://www.themoviedb.org/authenticate/" + this.state.request_token// + "&redirect_to=http://127.0.0.1:3000/login"
			})} else {
				axios.get("https://api.themoviedb.org/3/authentication/session/new?api_key=2005b3a7fc676c3bd69383469a281eff&request_token=" + token).then(res => {
					console.log(res.data)
					localStorage.setItem("TMDB_session_id", res.data.session_id)
					localStorage.removeItem("request_token")
					axios.get("https://api.themoviedb.org/3/account?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id")).then(res => {
						const User = {
							username: res.data.username,
							id: res.data.id,
							gravatar_hash: res.data.avatar.gravatar.hash,
							iso_639_1: res.data.iso_639_1,
							iso_3166_1: res.data.iso_3166_1
						}
						localStorage.setItem("User", JSON.stringify(User))
					})
				})
			}
	}
	render() {
		const session_id = localStorage.getItem("TMDB_session_id")
		if (session_id) {
			return(
				<Redirect to="/" />
			)
		}
		return(
			<p>This page will redirect you to TMDB's access page {session_id}</p>
		)
	}
}

export default LoginView
