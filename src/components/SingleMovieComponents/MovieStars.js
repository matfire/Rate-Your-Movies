import React from "react";

class MovieStars extends React.Component {
  render() {
    return (
      <div className="sb-it">
        <h6>Stars: </h6>
        <p>
          <a href="#">Robert Downey Jr,</a> <a href="#">Chris Evans,</a>{" "}
          <a href="#">Mark Ruffalo,</a>
          <a href="#"> Scarlett Johansson</a>
        </p>
      </div>
    );
  }
}

export default MovieStars;
