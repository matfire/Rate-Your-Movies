import React from "react";
import MovieUserReview from "./MovieUserReview";
class MovieReviewsTab extends React.Component {
  state = {
    loading:true
  }
  renderReviews = () => {
    if(this.props.data) {
      let results = this.props.data.results.map((r, index) => (
        <MovieUserReview data={r} key={r.id} />))
      return results
    }
  }
  render() {
    let tabClass = ""
    if(this.props.active) {
      tabClass = tabClass + " active"
    }
    const reviews = this.renderReviews()
    return (
      <div id="reviews" className={"tab review" + tabClass} >
        <div className="row">
          <div className="rv-hd">
            <div className="div">
              <h3>Reviews for</h3>
              <h2>{this.props.title}</h2>
            </div>
          </div>
          <div className="topbar-filter">
            <p>
            </p>
          </div>
          {reviews}
        </div>
      </div>
    );
  }
}

export default MovieReviewsTab;
