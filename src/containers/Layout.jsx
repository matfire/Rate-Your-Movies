import React from 'react'
import NavBarComponent from '../components/NavBar'
import {NotificationContainer} from 'react-notifications'

class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarComponent></NavBarComponent>
					<NotificationContainer/>
					{this.props.children}
			</div>
		)
	}
}
export default Layout