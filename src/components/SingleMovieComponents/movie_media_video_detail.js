import React from "react";

class MovieMediaVideoDetail extends React.Component {
  render() {
    return (
      <div className="vd-it">
        <img className="vd-img" src="images/uploads/vd-item1.jpg" alt />
        <a
          className="fancybox-media hvr-grow"
          href="https://www.youtube.com/embed/o-0hcF97wy0"
        >
          <img src="images/uploads/play-vd.png" alt />
        </a>
      </div>
    );
  }
}

export default MovieMediaVideoDetail;
