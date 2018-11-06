import React from "react";
import MovieCastCrewItemName from "./movie_cast_crew_item_name";

class MovieCastCrewItem extends React.Component {
  render() {
    return (
      <div className="cast-it">
        <MovieCastCrewItemName />
        <p>... Director</p>
      </div>
    );
  }
}

export default MovieCastCrewItem;
