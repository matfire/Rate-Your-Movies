import React from 'react'
import NavBarComponent from '../components/NavBar'
import {NotificationContainer} from 'react-notifications'
import Footer from './Footer'
class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarComponent/>
				<NotificationContainer/>
				<div className="container">
					{this.props.children}

				</div>
				<Footer />
			</div>
		)
	}
}
export default Layout