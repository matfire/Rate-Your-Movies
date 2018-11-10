import React from "react";
import MovieUserReview from "./MovieUserReview";

class MovieReviewsTab extends React.Component {
  renderReviews = () => {
    if(this.props.data.reviews) {
      if (this.props.data.reviews.results.length > 0) {
      let results = this.props.data.reviews.results.map((r, index) => {
        if (index < 9){return(<MovieUserReview id={r.id} key={r.id}/>)}})
      return results
      }
    } else {
      return(<p>No Reviews Found for Selected Movie</p>)
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
              <h2>{this.props.data.title}</h2>
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
