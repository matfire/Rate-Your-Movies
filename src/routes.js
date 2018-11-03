import {Route} from 'react-router-dom'
import React from 'react'
import Trending from './containers/Trending'
import DetailedView from './containers/DetailedView'

export default class BaseRouter extends React.Component {
	render() {
		return(
			<div>
				<Route exact path="/trending" component={Trending}/>
				<Route path="/movies/:id" component={DetailedView} />
			</div>
		)
	}
}