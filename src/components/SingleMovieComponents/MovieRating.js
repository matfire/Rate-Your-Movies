import React from "react";
import StarRatingComponent from 'react-star-rating-component';

class MovieRating extends React.Component {
  state = {
    rating: this.props.rating
  }
  onStarClick = (nextValue, prevValue, name) => {
    this.setState({rating: nextValue});
  }
  render() {
    return (
      <div className="movie-rate">
        <div className="rate">
          <i className="ion-android-star" />
          <p>
            <span>{this.props.rating}</span> /10
            <br />
          </p>
        </div>
        <div className="rate-star">
          <p>Rate This Movie:</p>
          <StarRatingComponent
            name="rate1" 
            starCount={10}
            value = {this.state.rating}
            onStarClick = {this.onStarClick}
          />
        </div>
      </div>
    );
  }
}

export default MovieRating;
