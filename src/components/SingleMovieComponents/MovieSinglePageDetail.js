import React from "react";
import MoviePosterSection from "./MoviePosterSection";
import MovieDataDetail from "./MovieDataDetail";

class MovieSinglePageDetail extends React.Component {
  state = {
    data : {}
  }

  componentWillReceiveProps() {
    this.setState({
      data: this.props.data
    })
  }
  render() {
    return (
      <div className="page-single movie-single movie_single">
        <div className="container">
          <div className="row ipad-width2">
            <MoviePosterSection poster={this.state.data.poster_path} title={this.state.data.title}/>
            <MovieDataDetail data={this.state.data}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieSinglePageDetail;
