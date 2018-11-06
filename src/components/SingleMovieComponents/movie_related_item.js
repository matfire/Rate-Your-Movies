import React from "react";

class MovieRelatedItem extends React.Component {
  render() {
    return (
      <div className="movie-item-style-2">
        <img src="images/uploads/mv1.jpg" alt />
        <div className="mv-item-infor" data="MovieRelatedItemInfo">
          <h6>
            <a href="#">
              oblivion <span>(2012)</span>
            </a>
          </h6>
          <p className="rate">
            <i className="ion-android-star" />
            <span>8.1</span> /10
          </p>
          <p className="describe">
            Earth's mightiest heroes must come together and learn to fight as a
            team if they are to stop the mischievous Loki and his alien army
            from enslaving humanity...
          </p>
          <p className="run-time">
            {" "}
            Run Time: 2h21’ . <span>MMPA: PG-13 </span> .{" "}
            <span>Release: 1 May 2015</span>
          </p>
          <p>
            Director: <a href="#">Joss Whedon</a>
          </p>
          <p>
            Stars: <a href="#">Robert Downey Jr.,</a>{" "}
            <a href="#">Chris Evans,</a> <a href="#"> Chris Hemsworth</a>
          </p>
        </div>
      </div>
    );
  }
}

export default MovieRelatedItem;
