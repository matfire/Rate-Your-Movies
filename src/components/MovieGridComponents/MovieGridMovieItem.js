import React from "react";
import MovieGridMovieItemLink from "./MovieGridMovieItemLink";
import MovieGridMovieItemInfo from "./MovieGridMovieItemInfo";

class MovieGridMovieItem extends React.Component {
  render() {
    return (
      <div className="movie-item-style-2 movie-item-style-1">
        <img src={"https://image.tmdb.org/t/p/w342" + this.props.data.poster_path} alt={this.props.data.title} />
        <MovieGridMovieItemLink id={this.props.data.id}/>
        <MovieGridMovieItemInfo id={this.props.data.id} title={this.props.data.title} rating={this.props.data.vote_average}/>
      </div>
    );
  }
}

export default MovieGridMovieItem;
