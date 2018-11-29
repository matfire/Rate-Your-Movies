import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Input, Button, MDBRow, toast, MDBContainer, MDBCol, Card, CardBody, CardTitle } from 'mdbreact';

class LoginView extends React.Component {

	state = {
		username: '',
		password: '',
		logged_in: false
	}

	componentDidMount() {
		let session = localStorage.getItem("TMDB_session_id")
		if(session){
			this.setState({logged_in:true})
		}
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value})
	}
	handleUsernameChange = (e) => {
		this.setState({username: e.target.value})
	}
	requestLoginConfirmation = (event) => {
		event.preventDefault()
		axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
			let token = res.data.request_token;
			let user_data = {
				username: this.state.username,
				password: this.state.password,
				request_token: token
			}
			axios.post("https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=2005b3a7fc676c3bd69383469a281eff", user_data).then(res => {
				axios.post("https://api.themoviedb.org/3/authentication/session/new?api_key=2005b3a7fc676c3bd69383469a281eff", {request_token:res.data.request_token}).then(res => {
					localStorage.setItem("TMDB_session_id", res.data.session_id)
					axios.get("https://api.themoviedb.org/3/account?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + res.data.session_id).then(res => {
						let user = {
							id: res.data.id,
							name: res.data.name,
							username: res.data.username,
							gravatar_hash: res.data.avatar.gravatar.hash,
							low_la: res.data.iso_639_1,
							hi_la: res.data.iso_3166_1
						}
						localStorage.setItem("User", JSON.stringify(user))
						this.setState({logged_in:true}, () => {
							toast.success("Welcome back, " + user.username)
						})
					})
				})
			}).catch(err => {
				toast.error("Something went wrong. Are you sure your credentials are correct?")
			})
		})
	}
	render() {
		if (this.state.logged_in) {
			return(
				<Redirect to="/" />
			)
		}
		return(
			<MDBContainer>
			<MDBRow center className="mt-5">
        		<MDBCol md="12">
				<h1 className="h5-responsive font-weight-bold text-center text-uppercase pb-5">Login with your TMDB(The Movie Database) Credentials</h1>
				</MDBCol>
				<MDBCol md="6">
					<Card>
						<CardBody>
							<form onSubmit={this.requestLoginConfirmation}>
								<div className="grey-text p-5 pr-5 text-center">
									<Input label="Enter your TMDB account username" group type="text" validate error="wrong" success="right" onChange={this.handleUsernameChange} required/>
									<Input label="Type your password" group type="password" validate onChange={this.handlePasswordChange} required/>
								
									<Button type="submit" color="cyan">Login</Button>
								</div>
							</form>
						</CardBody>
					</Card>
				  </MDBCol>
			</MDBRow>
			</MDBContainer>
		)
	}
}

export default LoginView
