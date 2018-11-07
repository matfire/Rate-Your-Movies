import React from 'react'


class Footer extends React.Component {
	render() {
		return(
			<footer className="ht-footer">
				<div className="container">
					<div className="flex-parent-ft">
						<div className="flex-child-ft item1">
						<a href="index.html"><img className="logo" src="images/logo1.png" alt=""/></a>
							 <p>5th Avenue st, manhattan<br></br>
							New York, NY 10001</p>
							<p>Call us: <a href="#">(+01) 202 342 6789</a></p>
						</div>
						<div className="flex-child-ft item2">
							<h4>Resources</h4>
							<ul>
								<li><a href="#">About</a></li> 
								<li><a href="#">Blockbuster</a></li>
								<li><a href="#">Contact Us</a></li>
								<li><a href="#">Forums</a></li>
								<li><a href="#">Blog</a></li>
								<li><a href="#">Help Center</a></li>
							</ul>
						</div>
						<div className="flex-child-ft item3">
							<h4>Legal</h4>
							<ul>
								<li><a href="#">Terms of Use</a></li> 
								<li><a href="#">Privacy Policy</a></li>	
								<li><a href="#">Security</a></li>
							</ul>
						</div>
						<div className="flex-child-ft item4">
							<h4>Account</h4>
							<ul>
								<li><a href="#">My Account</a></li> 
								<li><a href="#">Watchlist</a></li>	
								<li><a href="#">Collections</a></li>
								<li><a href="#">User Guide</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="ft-copyright">
					<div className="ft-left">
						<p>© 2018 Matteo Gassend. All Rights Reserved. Designed by Matteo Gassend.<br></br>Powered by The Movie Database</p>
					</div>
				<div className="backtotop">
					<p><a href="#" id="back-to-top">Back to top  <i className="ion-ios-arrow-thin-up"></i></a></p>
				</div>
	</div>
			</footer>
		)
	}
}

export default Footer