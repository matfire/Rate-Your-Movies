import React from "react";
import MovieMediaVideoDetail from "./MovieMediaVideoDetail";
import MovieMediaVideoInfo from "./MovieMediaVideoInfo";

class MovieMediaVideoItem extends React.Component {
  render() {
    return (
      <div className="vd-item">
        <MovieMediaVideoDetail />
        <MovieMediaVideoInfo />
      </div>
    );
  }
}

export default MovieMediaVideoItem;
