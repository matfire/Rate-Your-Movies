import React from "react";
import MovieDirector from "./MovieDirector";
import MovieWriter from "./MovieWriter";
import MovieStars from "./MovieStars";
import MovieGenres from "./MovieGenres";
import MovieReleaseDate from "./MovieReleaseDate";
import MovieRunTime from "./MovieRunTime";
import MovieMMPARating from "./MovieMMPARating";
import MoviePlotList from "./MoviePlotList";

class MovieCrewList extends React.Component {
  render() {
    return (
      <div className="col-md-4 col-xs-12 col-sm-12">
        <MovieDirector />
        <MovieWriter />
        <MovieStars />
        <MovieGenres />
        <MovieReleaseDate />
        <MovieRunTime />
        <MovieMMPARating />
        <MoviePlotList />
      </div>
    );
  }
}

export default MovieCrewList;
