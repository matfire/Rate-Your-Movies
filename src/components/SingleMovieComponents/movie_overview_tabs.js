import React from "react";
import MovieMedia from "./movie_media";
import MovieCasting from "./movie_casting";
import MovieUserReviewsCallback from "./movie_user_reviews_callback";
import MovieCrewList from "./movie_crew_list";

class MovieOverviewTabs extends React.Component {
  render() {
    return (
      <div id="overview" className="tab active">
        <div className="row">
          <div className="col-md-8 col-sm-12 col-xs-12">
            <p>
              Tony Stark creates the Ultron Program to protect the world, but
              when the peacekeeping program becomes hostile, The Avengers go
              into action to try and defeat a virtually impossible enemy
              together. Earth's mightiest heroes must come together once again
              to protect the world from global extinction.
            </p>
            <div className="title-hd-sm">
              <h4>Videos & Photos</h4>
              <a href="#" className="time">
                All 5 Videos & 245 Photos <i className="ion-ios-arrow-right" />
              </a>
            </div>
            <MovieMedia />
            <div className="title-hd-sm">
              <h4>cast</h4>
              <a href="#" className="time">
                Full Cast & Crew <i className="ion-ios-arrow-right" />
              </a>
            </div>
            {}
            <MovieCasting />
            <MovieUserReviewsCallback />
            {}
          </div>
          <MovieCrewList />
        </div>
      </div>
    );
  }
}

export default MovieOverviewTabs;
