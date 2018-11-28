import React from 'react'
import NavBarComponent from '../components/NavBar'
import {Button} from 'mdbreact'
import {ToastContainer} from 'mdbreact'
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Footer from './Footer'
class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarComponent/>
				<div className="container-fluid pr-0 pl-0">
							<ToastContainer />
							{this.props.children}
							<ScrollUpButton />
				</div>
			</div>
		)
	}
}
export default Layout
