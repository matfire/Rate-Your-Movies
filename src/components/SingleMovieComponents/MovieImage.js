import React from "react";

class MovieImage extends React.Component {
  render() {
    return (
      <a
        className="img-lightbox"
        data-fancybox-group="gallery"
        href="images/uploads/image11.jpg"
      >
        <img src="images/uploads/image1.jpg" alt="test" />
      </a>
    );
  }
}

export default MovieImage;
