import React from "react";

class MovieGridMovieItemLink extends React.Component {
  render() {
    return (
      <div className="hvr-inner">
        <a href="moviesingle.html">
          {" "}
          Read more <i className="ion-android-arrow-dropright" />{" "}
        </a>
      </div>
    );
  }
}

export default MovieGridMovieItemLink;
