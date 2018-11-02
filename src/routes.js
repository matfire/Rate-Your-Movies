import {Route} from 'react-router-dom'
import React from 'react'
import Trending from './containers/Trending'

export default class BaseRouter extends React.Component {
	render() {
		return(
			<div>
				<Route exact path="/trending" component={Trending}/>
			</div>
		)
	}
}