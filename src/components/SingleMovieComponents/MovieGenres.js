import React from "react";

class MovieGenres extends React.Component {
  render() {
    return (
      <div className="sb-it">
        <h6>Genres:</h6>
        <p>
          <a href="#">Action, </a> <a href="#"> Sci-Fi,</a>{" "}
          <a href="#">Adventure</a>
        </p>
      </div>
    );
  }
}

export default MovieGenres;
