import React from "react";
import MovieCastMemberImage from "./movie_cast_member_image";

class MovieCastMember extends React.Component {
  render() {
    return (
      <div className="cast-it">
        <MovieCastMemberImage />
        <p>... Robert Downey Jr.</p>
      </div>
    );
  }
}

export default MovieCastMember;
