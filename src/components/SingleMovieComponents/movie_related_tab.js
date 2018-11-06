import React from "react";
import MovieRelatedItem from "./movie_related_item";
import MovieRelatedPagination from "./movie_related_pagination";

class MovieRelatedTab extends React.Component {
  render() {
    return (
      <div id="moviesrelated" className="tab">
        <div className="row">
          <h3>Related Movies To</h3>
          <h2>Skyfall: Quantum of Spectre</h2>
          <div className="topbar-filter">
            <p>
              Found <span>12 movies</span> in total
            </p>
          </div>
          <MovieRelatedItem />
          <div className="topbar-filter">
            <MovieRelatedPagination />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieRelatedTab;
