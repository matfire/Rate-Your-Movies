import React from "react";
import MovieGridMovieItem from "./MovieGridMovieItem";

class MovieGridMovieList extends React.Component {
  render() {
    return (
      <div className="flex-wrap-movielist">
        <MovieGridMovieItem />
      </div>
    );
  }
}

export default MovieGridMovieList;
