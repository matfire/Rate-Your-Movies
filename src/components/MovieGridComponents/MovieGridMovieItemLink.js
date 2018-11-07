import React from "react";

class MovieGridMovieItemLink extends React.Component {
  render() {
    return (
      <div className="hvr-inner">
        <a href={"/movies/" + this.props.id}>
          Read more <i className="ion-android-arrow-dropright" />
        </a>
      </div>
    );
  }
}

export default MovieGridMovieItemLink;
