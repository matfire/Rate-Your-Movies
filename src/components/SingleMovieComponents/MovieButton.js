import React from "react";

class MovieButton extends React.Component {
  render() {
    return (
      <div className="movie-btn">
        <div className="btn-transform transform-vertical red">
          <div>
            <a href="#" className="item item-1 redbtn">
              {" "}
              <i className="ion-play" /> Watch Trailer
            </a>
          </div>
          <div>
            <a
              href="https://www.youtube.com/embed/o-0hcF97wy0"
              className="item item-2 redbtn fancybox-media hvr-grow"
            >
              <i className="ion-play" />
            </a>
          </div>
        </div>
        <div className="btn-transform transform-vertical">
          <div>
            <a href="#" className="item item-1 yellowbtn">
              {" "}
              <i className="ion-card" /> Buy ticket
            </a>
          </div>
          <div>
            <a href="#" className="item item-2 yellowbtn">
              <i className="ion-card" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieButton;
