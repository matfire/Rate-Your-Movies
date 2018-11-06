import React from "react";
import MovieButton from "./movie_button";

class MoviePosterSection extends React.Component {
  render() {
    return (
      <div className="col-md-4 col-sm-12 col-xs-12">
        <div className="movie-img sticky-sb">
          <img src="images/uploads/movie-single.jpg" alt />
          <MovieButton />
        </div>
      </div>
    );
  }
}

export default MoviePosterSection;
