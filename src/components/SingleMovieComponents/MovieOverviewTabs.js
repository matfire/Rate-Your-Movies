import React from "react";
import MovieMedia from "./MovieMedia";
import MovieCasting from "./MovieCasting";
import MovieUserReviewsCallback from "./MovieUserReviewsCallback";
import MovieCrewList from "./MovieCrewList";
import axios from 'axios'
class MovieOverviewTabs extends React.Component {
  state = {
    crew: [],
    cast: []
  }
  getCast = () => {
    axios.get("https://api.themoviedb.org/3/movie/" + this.props.data.id + "/credits?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
      this.setState({
        crew: res.data.crew,
        cast: res.data.cast
      })
    })
  }
  render() {
    if (this.props.data.id !== undefined && this.state.cast.length === 0) {
      this.getCast()
    }
    let tabClass = "tab"
    if(this.props.active) {
      tabClass = tabClass + " active"
    }
    return (
      <div id="overview" className={tabClass}>
        <div className="row">
          <div className="col-md-8 col-sm-12 col-xs-12">
            <p>
              {this.props.data.overview}
            </p>
            {/* <div className="title-hd-sm">
              <h4>Videos & Photos</h4>
              <a href="/" className="time">
                All 5 Videos & 245 Photos <i className="ion-ios-arrow-right" />
              </a>
            </div>
            <MovieMedia id={this.props.details.id}/> */}
            <div className="title-hd-sm">
              <h4>cast</h4>
              <a href="/" className="time">
                Full Cast & Crew <i className="ion-ios-arrow-right" />
              </a>
            </div>
            <MovieCasting cast={this.state.cast}/>
            <MovieUserReviewsCallback />
          </div>
          <MovieCrewList />
        </div>
      </div>
    );
  }
}

export default MovieOverviewTabs;
