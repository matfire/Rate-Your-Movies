import React from "react";
import MovieDirector from "./movie_director";
import MovieWriter from "./movie_writer";
import MovieStars from "./movie_stars";
import MovieGenres from "./movie_genres";
import MovieReleaseDate from "./movie_release_date";
import MovieRunTime from "./movie_run_time";
import MovieMMPARating from "./movie_mmparating";
import MoviePlotList from "./movie_plot_list";

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
