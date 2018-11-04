import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Trending from './containers/Trending'
import DetailedView from './containers/DetailedView'
import SearchResults from './containers/SearchResults'
import LoginView from './containers/LoginView'
import PersonalLists from './containers/PersonalLists'
import ListDetailView from './containers/ListDetailView'

export default class BaseRouter extends React.Component {
	render() {
		return(
						<div>
							<Route exact path="/trending" component={Trending}/>
							<Route exact path="/login" component={LoginView} />
							<Switch>
								<Route exact path="/movies/search-result" render={(props) => <SearchResults {...props} query={this.props.searchQuery} />}/>
								<Route path="/movies/:id" component={DetailedView} />
							</Switch>
							<Switch>
								<Route path="/list/:id" component={ListDetailView}/>
								<Route exact path="/list" component={PersonalLists} />
							</Switch>
						</div>
		)
	}
}