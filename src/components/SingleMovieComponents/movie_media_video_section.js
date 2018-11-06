import React from "react";
import MovieMediaVideoItem from "./movie_media_video_item";

class MovieMediaVideoSection extends React.Component {
  render() {
    return (
      <div className="mvsingle-item media-item">
        <MovieMediaVideoItem />
      </div>
    );
  }
}

export default MovieMediaVideoSection;
