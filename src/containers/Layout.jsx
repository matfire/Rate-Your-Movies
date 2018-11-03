import React from 'react'
import NavBarLayout from '../components/NavBar'
import {NotificationContainer} from 'react-notifications'

class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarLayout></NavBarLayout>
				<div className="container-fluid">
					<NotificationContainer/>
					{this.props.children}
				</div>
			</div>
		)
	}
}
export default Layout