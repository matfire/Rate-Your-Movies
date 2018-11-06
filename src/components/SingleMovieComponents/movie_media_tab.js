import React from "react";
import MovieMediaIntroduction from "./movie_media_introduction";
import MovieMediaVideoSection from "./movie_media_video_section";
import MovieMediaImageSection from "./movie_media_image_section";

class MovieMediaTab extends React.Component {
  render() {
    return (
      <div id="media" className="tab">
        <div className="row">
          <MovieMediaIntroduction />
          <div className="title-hd-sm">
            <h4>
              Videos <span>(8)</span>
            </h4>
          </div>
          <MovieMediaVideoSection />
          <div className="title-hd-sm">
            <h4>
              Photos <span> (21)</span>
            </h4>
          </div>
          <MovieMediaImageSection />
        </div>
      </div>
    );
  }
}

export default MovieMediaTab;
