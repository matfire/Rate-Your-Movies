import React from "react";
import MovieMediaIntroduction from "./MovieMediaIntroduction";
import MovieMediaVideoSection from "./MovieMediaVideoSection";
import MovieMediaImageSection from "./MovieMediaImageSection";

class MovieMediaTab extends React.Component {

  render() {
    let tabClass = "tab"
    if(this.props.active) {
      tabClass = tabClass + " active"
    }
    return (
      <div id="media" className={tabClass}>
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
