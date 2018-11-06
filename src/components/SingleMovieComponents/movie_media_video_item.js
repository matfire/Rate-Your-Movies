import React from "react";
import MovieMediaVideoDetail from "./movie_media_video_detail";
import MovieMediaVideoInfo from "./movie_media_video_info";

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
