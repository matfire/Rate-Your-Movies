import React from "react";
import MovieReviewInfoUser from "./MovieReviewInfoUser";
import axios from 'axios'
import { AtomSpinner } from 'react-epic-spinners'

class MovieUserReview extends React.Component {
  state = {
    data: {},
    loading: true
  }
  render() {
    return (
      <div className="mv-user-review-item">
        <MovieReviewInfoUser author={this.props.data.author}/>
        <p>
          {this.props.data.content}
        </p>
      </div>
    );
  }
}

export default MovieUserReview;
