import React from 'react'
import NavBarComponent from '../components/NavBar'
import {NotificationContainer} from 'react-notifications'
import Footer from './Footer'
class Layout extends React.Component {
	render() {
		return(
			<React.Fragment>
				<NavBarComponent />
				<NotificationContainer/>
				{this.props.children}
				<Footer />
			</React.Fragment>
		)
	}
}
export default Layout