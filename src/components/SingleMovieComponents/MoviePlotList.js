import React from "react";
import MoviePlotItem from "./MoviePlotItem";

class MoviePlotList extends React.Component {
  render() {
    return (
      <div className="sb-it">
        <h6>Plot Keywords:</h6>
        <p className="tags">
          <MoviePlotItem />
        </p>
      </div>
    );
  }
}

export default MoviePlotList;
