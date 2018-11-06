import React from "react";

class MovieRelatedPagination extends React.Component {
  render() {
    return (
      <div className="pagination2">
        <span>Page 1 of 2:</span>
        <a className="active" href="/">
          1
        </a>
        <a href="/">2</a>
        <a href="/">
          <i className="ion-arrow-right-b" />
        </a>
      </div>
    );
  }
}

export default MovieRelatedPagination;
