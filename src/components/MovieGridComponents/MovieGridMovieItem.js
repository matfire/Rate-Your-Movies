import React from "react";
import MovieGridMovieItemLink from "./MovieGridMovieItemLink";
import MovieGridMovieItemInfo from "./MovieGridMovieItemInfo";

class MovieGridMovieItem extends React.Component {
  render() {
    return (
      <div className="movie-item-style-2 movie-item-style-1">
        <img src="images/uploads/mv1.jpg" alt />
        <MovieGridMovieItemLink />
        <MovieGridMovieItemInfo />
      </div>
    );
  }
}

export default MovieGridMovieItem;
