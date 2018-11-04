import React from 'react'
import {Input} from 'reactstrap'
import {AppContext} from '../App'
import {withRouter} from 'react-router-dom'

class SearchBar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			query:"",
			results: [],
		}
	}
	handleInputChange = (e) => {
		this.setState({
		  query: e.target.value
		})
	  }
	  render() {
		return (
			<AppContext.Consumer>
				{(context) => {
							return(
								<div className="mt-1 ml-2">
									<form onSubmit={
										(e) => {
											e.preventDefault()
											context.handleResultsSubmit(this.state.query)
											this.props.history.push("/movies/search-result")
										}
									}>
										<Input
										placeholder="Search for..."
										onChange = {this.handleInputChange}
										/>
									</form>
								</div>
							)
				}
				}
			</AppContext.Consumer>
		)
	}
}

export default withRouter(SearchBar)