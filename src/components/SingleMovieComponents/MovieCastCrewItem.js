import React from "react";
import MovieCastCrewItemName from "./MovieCastCrewItemName";

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
