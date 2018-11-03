import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Trending from './containers/Trending'
import DetailedView from './containers/DetailedView'
import SearchResults from './containers/SearchResults'
import {AppContext} from './App'

export default class BaseRouter extends React.Component {
	render() {
		return(
						<div>
							<Route exact path="/trending" component={Trending}/>
							<Switch>
								<Route exact path="/movies/search-result" render={(props) => <SearchResults {...props} query={this.props.searchQuery} />}/>
								<Route path="/movies/:id" component={DetailedView} />
							</Switch>
						</div>
		)
	}
}