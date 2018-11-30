import React from 'react'
import {MDBRow, MDBCol} from 'mdbreact'

class NotFound extends React.Component {
	render() {
		return(
			<MDBRow center>
				<MDBCol md="12" className="text-center">
					<img src="/images/assets/404.png" alt="404 Not Found" className="mt-5"/>
				</MDBCol>
				<MDBCol md="12">
				<h1 className="h5-responsive font-weight-bold text-center text-uppercase pb-5">Click <a href="/">Here</a> to go back home</h1>
				</MDBCol>
			</MDBRow>
		)
	}
}

export default NotFound