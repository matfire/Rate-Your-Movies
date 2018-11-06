import React from "react";
import MovieCastCrewSectionSeparator from "./MovieCastCrewSectionSeparator";
import MovieCastCrewSection from "./MovieCastCrewSection";

class MovieCastCrewTab extends React.Component {
  render() {
    let tabClass = "tab"
    if(this.props.active) {
      tabClass = tabClass + " active"
    }
    return (
      <div id="cast" className={tabClass}>
        <div className="row">
          <h3>Cast & Crew of</h3>
          <h2>Avengers: Age of Ultron</h2>
          {}
          <MovieCastCrewSectionSeparator />
          <MovieCastCrewSection />
          {}
        </div>
      </div>
    );
  }
}

export default MovieCastCrewTab;
