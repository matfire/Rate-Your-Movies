import React from "react";
import MovieImage from "./movie_image";
import MovieVideo from "./movie_video";

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
