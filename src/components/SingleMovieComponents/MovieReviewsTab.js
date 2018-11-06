import React from "react";
import MovieUserReview from "./MovieUserReview";
import MovieReviewsPagination from "./MovieReviewsPagination";

class MovieReviewsTab extends React.Component {
  render() {
    let tabClass = ""
    if(this.props.active) {
      tabClass = tabClass + " active"
    }
    return (
      <div id="reviews" className={"tab review" + tabClass}>
        <div className="row">
          <div className="rv-hd">
            <div className="div">
              <h3>Related Movies To</h3>
              <h2>{this.props.data.title}</h2>
            </div>
            <a href="/" className="redbtn">
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
