import React from "react";
import MovieImage from "./MovieImage";
import MovieVideo from "./MovieVideo";

class MovieMedia extends React.Component {
  render() {
    return (
      <div className="mvsingle-item ov-item">
        <MovieImage />
        <MovieVideo />
      </div>
    );
  }
}

export default MovieMedia;
