import React from 'react'
import { Col, Container, Row, Footer } from "mdbreact";

class FooterPage extends React.Component {
render() {
return (
<Footer color="black" className="font-small pt-5 pb-5">
  <Container className="">
    <div className="row pb-5">
      <div className="col-sm text-center">
      <a href="https://www.themoviedb.org" target="_blank"><img src="/images/assets/TMDB.png" ALT="TMBD" className="img-fluid"/></a>
      </div>
      <div className="col-sm text-center">
        <h6>RATE YOUR MOVIE</h6>
        <p>Prima o poi mi verrà in mente qualcosa...</p>
      </div>
  </div>
  </Container>
  <div className="footer-copyright text-center">
    <Container fluid className="pt-3">
      &copy; {new Date().getFullYear()} {" "}
      <a href="https://www.mgassend.com"> Matteo Gassend </a><br />20 rue Jules Vernes 13003 Lyon< br/><a href="mailto:mgassend@gmail.com">mgassend@gmail.com</a>
    </Container>
  </div>
</Footer>
);
}
}

export default FooterPage
