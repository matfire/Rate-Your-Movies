import React from 'react'
import NavBarComponent from '../components/NavBar'
import {Button, ButtonFixed} from 'mdbreact'

import {ToastContainer} from 'mdbreact'
import Footer from './Footer'
class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarComponent/>
				<div className="container">
					<ToastContainer />
					{this.props.children}
					<ButtonFixed topSection="#top-section" floating size="lg" color="blue" icon="arrow-up" style={{bottom: '45px', right: '24px'}}></ButtonFixed>
				</div>
				<Footer />
			</div>
		)
	}
}
export default Layout
