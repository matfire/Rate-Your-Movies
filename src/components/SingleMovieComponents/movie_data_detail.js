import React from "react";
import MovieRating from "./movie_rating";
import MovieOverviewTabs from "./movie_overview_tabs";
import MovieReviewsTab from "./movie_reviews_tab";
import MovieCastCrewTab from "./movie_cast_crew_tab";
import MovieMediaTab from "./movie_media_tab";
import MovieRelatedTab from "./movie_related_tab";

class MovieDataDetail extends React.Component {
  render() {
    return (
      <div className="col-md-8 col-sm-12 col-xs-12">
        <div className="movie-single-ct main-content">
          <h1 className="bd-hd">
            Skyfall: Quantum of Spectre <span>2015</span>
          </h1>
          <div className="social-btn">
            <a href="#" className="parent-btn">
              <i className="ion-heart" /> Add to Favorite
            </a>
            <div className="hover-bnt">
              <a href="#" className="parent-btn">
                <i className="ion-android-share-alt" />
                share
              </a>
              <div className="hvr-item">
                <a href="#" className="hvr-grow">
                  <i className="ion-social-facebook" />
                </a>
                <a href="#" className="hvr-grow">
                  <i className="ion-social-twitter" />
                </a>
                <a href="#" className="hvr-grow">
                  <i className="ion-social-googleplus" />
                </a>
                <a href="#" className="hvr-grow">
                  <i className="ion-social-youtube" />
                </a>
              </div>
            </div>
          </div>
          <MovieRating />
          <div className="movie-tabs">
            <div className="tabs">
              <ul className="tab-links tabs-mv">
                <li className="active">
                  <a href="#overview">Overview</a>
                </li>
                <li>
                  <a href="#reviews"> Reviews</a>
                </li>
                <li>
                  <a href="#cast"> Cast & Crew </a>
                </li>
                <li>
                  <a href="#media"> Media</a>
                </li>
                <li>
                  <a href="#moviesrelated"> Related Movies</a>
                </li>
              </ul>
              <div className="tab-content">
                <MovieOverviewTabs />
                <MovieReviewsTab />
                <MovieCastCrewTab />
                <MovieMediaTab />
                <MovieRelatedTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDataDetail;
