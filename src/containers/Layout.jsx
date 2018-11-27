import React from 'react'
import NavBarComponent from '../components/NavBar'
import {ToastContainer, ButtonFixed} from 'mdbreact'
import Footer from './Footer'
class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarComponent/>
				<div className="container-fluid pr-0 pl-0">
							<ToastContainer />
							{this.props.children}
							<ButtonFixed  topSection="#top-section" floating size="lg" color="blue" icon="arrow-up" style={{bottom: '45px', right: '24px'}} />
				</div>
				<Footer />
			</div>
		)
	}
}
export default Layout
