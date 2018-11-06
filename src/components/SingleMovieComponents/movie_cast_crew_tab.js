import React from "react";
import MovieCastCrewSectionSeparator from "./movie_cast_crew_section_separator";
import MovieCastCrewSection from "./movie_cast_crew_section";

class MovieCastCrewTab extends React.Component {
  render() {
    return (
      <div id="cast" className="tab">
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
