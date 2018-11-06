import React from "react";
import MovieCastMemberImage from "./MovieCastMemberImage";

class MovieCastMember extends React.Component {
  render() {
    return (
      <div className="cast-it">
        <MovieCastMemberImage data={this.props.cast}/>
        <p>... {this.props.cast.character}</p>
      </div>
    );
  }
}

export default MovieCastMember;
