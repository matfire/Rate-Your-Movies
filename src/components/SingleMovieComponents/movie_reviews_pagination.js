import React from "react";

class MovieReviewsPagination extends React.Component {
  render() {
    return (
      <div className="topbar-filter">
        <label>Reviews per page:</label>
        <select>
          <option value="range">5 Reviews</option>
          <option value="saab">10 Reviews</option>
        </select>
        <div className="pagination2">
          <span>Page 1 of 6:</span>
          <a className="active" href="#">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">
            <i className="ion-arrow-right-b" />
          </a>
        </div>
      </div>
    );
  }
}

export default MovieReviewsPagination;
