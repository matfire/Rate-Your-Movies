import React from "react";
import MovieRelatedItem from "./MovieRelatedItem";
import MovieRelatedPagination from "./MovieRelatedPagination";

class MovieRelatedTab extends React.Component {
  render() {
    let tabClass = "tab"
    if(this.props.active) {
      tabClass = tabClass + " active"
    }
    return (
      <div id="moviesrelated" className={tabClass}>
        <div className="row">
          <h3>Related Movies To</h3>
          <h2>{this.props.data.title}</h2>
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
