import React from 'react'
import NavBarComponent from '../components/NavBar'
import {NotificationContainer} from 'react-notifications'
import {Button} from 'mdbreact'
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Footer from './Footer'
class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarComponent/>
				<NotificationContainer/>
				<div className="container">
					{this.props.children}
					<ScrollUpButton />
				</div>
				<Footer />
			</div>
		)
	}
}
export default Layout
