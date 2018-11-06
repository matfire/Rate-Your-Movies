import React from "react";
import MovieCastMember from "./movie_cast_member";

class MovieCasting extends React.Component {
  render() {
    return (
      <div className="mvcast-item">
        <MovieCastMember />
      </div>
    );
  }
}

export default MovieCasting;
