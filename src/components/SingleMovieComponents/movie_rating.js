import React from "react";

class MovieRating extends React.Component {
  render() {
    return (
      <div className="movie-rate">
        <div className="rate">
          <i className="ion-android-star" />
          <p>
            <span>8.1</span> /10
            <br />
            <span className="rv">56 Reviews</span>
          </p>
        </div>
        <div className="rate-star">
          <p>Rate This Movie:</p>
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star" />
          <i className="ion-ios-star-outline" />
        </div>
      </div>
    );
  }
}

export default MovieRating;
