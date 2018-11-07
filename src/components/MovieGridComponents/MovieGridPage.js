import React from "react";
import MovieGridMovieList from "./MovieGridMovieList";
import MovieGridPageSearchComponent from "./MovieGridPageSearchComponent";

class MovieGridPage extends React.Component {
  render() {
    return (
      <div className="page-single">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <MovieGridMovieList />
            </div>
            <MovieGridPageSearchComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieGridPage;
