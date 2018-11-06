import React from "react";

class MovieCastMemberImage extends React.Component {
  render() {
    return (
      <div className="cast-left">
        <img src={"https://image.tmdb.org/t/p/w45" + this.props.data.profile_path} alt="test" />
        <a href="/">{this.props.data.name}</a>
      </div>
    );
  }
}

export default MovieCastMemberImage;
