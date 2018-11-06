import React from 'react'
import NavBarComponent from '../components/NavBar'
import {NotificationContainer} from 'react-notifications'

class Layout extends React.Component {
	render() {
		return(
			<React.Fragment>
				<NavBarComponent />
					<NotificationContainer/>
					{this.props.children}
			</React.Fragment>
		)
	}
}
export default Layout