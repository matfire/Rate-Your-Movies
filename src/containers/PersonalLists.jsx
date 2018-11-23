import React from 'react'
import axios from 'axios'
import {Table} from 'reactstrap'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'mdbreact'
import 	{NotificationManager} from 'react-notifications'
import {Redirect} from 'react-router-dom'
import { insertGlobal } from 'glamor';
class PersonalLists extends React.Component {
	state = {
		lists: [],
		page: 1,
		total_pages: 1,
		isModalOpen: false,
		listTitle: "",
		listDescription: ""
	}
	
	componentDidMount() {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}
		const session = localStorage.getItem("TMDB_session_id")
		if (session) {
		axios.get("https://api.themoviedb.org/3/account/" + User.id  + "/lists?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language + "&session_id=" + localStorage.getItem("TMDB_session_id") + "&page=1").then(res => {
			this.setState({
				lists:res.data.results
			})
		}).catch(err => {console.log(err)})
	}
	}
	getLists = () => {
		let User = JSON.parse(localStorage.getItem("User"))
		let language="en-US"
		if (User) {
			language = User.low_la + "-" + User.hi_la
		}		const session = localStorage.getItem("TMDB_session_id")
		if (session) {
		axios.get("https://api.themoviedb.org/3/account/" + User.id  + "/lists?api_key=2005b3a7fc676c3bd69383469a281eff&language=" + language + "&session_id=" + localStorage.getItem("TMDB_session_id") + "&page=1").then(res => {
			this.setState({
				lists:res.data.results
			})
		}).catch(err => {console.log(err)})
	}
	}
	onTitleChange = (e) => {
		this.setState({listTitle: e.target.value})
	}
	onDescriptionChange = (e) => {
		this.setState({listDescription: e.target.value})
	}
	handleDeleteList = (id) => {
		let session = localStorage.getItem("TMDB_session_id")
		axios.delete("https://api.themoviedb.org/3/list/" + id + "?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + session).then(res => {
			this.getLists()
		}).catch(err => {
			if (err.response) {
				if(err.response.status === 500) {
					this.getLists()
				}
			}
		})
	}
	handleListCreation = (e) => {
		e.preventDefault()
		let session = localStorage.getItem("TMDB_session_id")
		let data = {
			name: this.state.listTitle,
			description: this.state.listDescription,
			language: "en"
		}
		if (this.state.listTitle === "" || this.state.listDescription === "") {
			NotificationManager.success("Check your data")
			return(false)
		}
		axios.post("https://api.themoviedb.org/3/list?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + session, data).then(res => {
			NotificationManager.success("List " + this.state.listTitle + " added succesfully", "Success")
			this.setState({
				listTitle: "",
				listDescription: ""
			})
			this.getLists()
		}).catch(err => {
			if (err.response === undefined) {
					NotificationManager.success("List " + this.state.listTitle + " added succesfully", "Success")
					this.setState({
						listTitle: "",
						listDescription: ""
					})
					this.getLists()
					this.toggleModal()
				}
			})
	}
	toggleModal = () => {
		this.setState({isModalOpen: !this.state.isModalOpen})
	}
	render() {
		const session = localStorage.getItem("TMDB_session_id")
		if (!session) {
			return(<Redirect to="/" />)
		}
		return(
			<div className="mt-5">
				<Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()} centered size="lg">
					<ModalHeader toggle={() => this.toggleModal()}>Add List</ModalHeader>
					<form onSubmit={this.handleListCreation}>
					<ModalBody>
						<Input label="List Title" validate required onChange={this.onTitleChange}/>
						<Input label="List Description" type="textarea" validate required  onChange={this.onDescriptionChange}/>
					</ModalBody>
					<ModalFooter>
						<Button color="success" type="submit" outline>Create</Button>
						<Button color="danger" outline onClick={() => this.toggleModal()}>Close</Button>
					</ModalFooter>
					</form>
				</Modal>
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th></th>
							<th><Button color="primary" size="sm" onClick={this.toggleModal}>Add List</Button></th>
						</tr>
					</thead>
					<tbody>
						{this.state.lists.map((list) => (
							<tr key={list.id}>
								<th scope="row"><a href={"/list/" + list.id}>{list.name}</a></th>
								<th>{list.description}</th>
								<th><Button color="danger" outline size="sm" onClick={() => {this.handleDeleteList(list.id)}}>Delete List</Button></th>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		)
	}
}

export default PersonalLists