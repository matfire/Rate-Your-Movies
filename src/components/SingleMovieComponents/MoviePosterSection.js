import React from "react";
import MovieButton from "./MovieButton";

class MoviePosterSection extends React.Component {
  render() {
    return (
      <div className="col-md-4 col-sm-12 col-xs-12">
        <div className="movie-img sticky-sb">
          <img src={"https://image.tmdb.org/t/p/w342" + this.props.poster} alt={this.props.title} />
          <MovieButton />
        </div>
      </div>
    );
  }
}

export default MoviePosterSection;
