import React from "react";

class MovieSinglePageHero extends React.Component {
  render() {
    return (
      <div className="hero mv-single-hero" style={{backgroundImage: "https://image.tmdb.org/t/p/w342/" + this.props.backdrop_path}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">{}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieSinglePageHero;
