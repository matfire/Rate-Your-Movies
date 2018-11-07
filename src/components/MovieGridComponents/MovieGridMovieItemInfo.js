import React from "react";

class MovieGridMovieItemInfo extends React.Component {
  render() {
    return (
      <div className="mv-item-infor">
        <h6>
          <a href="#">oblivion</a>
        </h6>
        <p className="rate">
          <i className="ion-android-star" />
          <span>8.1</span> /10
        </p>
      </div>
    );
  }
}

export default MovieGridMovieItemInfo;
