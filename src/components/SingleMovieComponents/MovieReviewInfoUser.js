import React from "react";

class MovieReviewInfoUser extends React.Component {
  render() {
    return (
      <div className="user-infor">
        <div>
          <p className="time">
            by <a href="/"> {this.props.author}</a>
          </p>
        </div>
      </div>
    );
  }
}

export default MovieReviewInfoUser;
