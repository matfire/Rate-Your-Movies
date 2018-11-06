import React from "react";
import MovieUserReview from "./movie_user_review";
import MovieReviewsPagination from "./movie_reviews_pagination";

class MovieReviewsTab extends React.Component {
  render() {
    return (
      <div id="reviews" className="tab review">
        <div className="row">
          <div className="rv-hd">
            <div className="div">
              <h3>Related Movies To</h3>
              <h2>Skyfall: Quantum of Spectre</h2>
            </div>
            <a href="#" className="redbtn">
              Write Review
            </a>
          </div>
          <div className="topbar-filter">
            <p>
              Found <span>56 reviews</span> in total
            </p>
          </div>
          <MovieUserReview />
          <MovieReviewsPagination />
        </div>
      </div>
    );
  }
}

export default MovieReviewsTab;
