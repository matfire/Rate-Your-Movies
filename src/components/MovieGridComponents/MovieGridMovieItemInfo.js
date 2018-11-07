import React from "react";

class MovieGridMovieItemInfo extends React.Component {
  render() {
    return (
      <div className="mv-item-infor">
        <h6>
          <a href={"/movies/" + this.props.id}>{this.props.title}</a>
        </h6>
        <p className="rate">
          <i className="ion-android-star" />
          <span>{this.props.rating}</span> /10
        </p>
      </div>
    );
  }
}

export default MovieGridMovieItemInfo;
