import React from 'react'
import NavBarLayout from '../components/NavBar'


class Layout extends React.Component {
	render() {
		return(
			<div>
				<NavBarLayout></NavBarLayout>
				<div className="container-fluid">
					{this.props.children}
				</div>
			</div>
		)
	}
}
export default Layout