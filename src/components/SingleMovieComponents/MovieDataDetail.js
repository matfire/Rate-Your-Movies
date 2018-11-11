import React from "react";
import MovieRating from "./MovieRating";
import MovieOverviewTabs from "./MovieOverviewTabs";
import MovieReviewsTab from "./MovieReviewsTab";
import MovieCastCrewTab from "./MovieCastCrewTab";
import MovieMediaTab from "./MovieMediaTab";
import MovieRelatedTab from "./MovieRelatedTab";
import axios from 'axios'
class MovieDataDetail extends React.Component {
  state = {
    data : this.props.data,
    activeTab: 1,
    favorite: false
  }

  hadleChangeActiveTab = (id) => {
    if (id !== this.state.vote_average) {
      this.setState({activeTab: id})
    }
  }
  renderTabTitle = (name, id) => {
      if (this.state.activeTab === id) {
        return(
        <li className="active">
          <a href={"javascript:void(0)"} onClick={() => {this.hadleChangeActiveTab(id)}}>{name}</a>
        </li>
        )
      }
      return(
        <li>
          <a href={"javascript:void(0)"} onClick={() => {this.hadleChangeActiveTab(id)}}>{name}</a>
        </li>
      )

  }
  handleFavorite = (id) => {
    const data = {
      type: "movie",
      id,
      favorite: !this.state.favorite
    }
  }
  render() {
    let year = this.props.data.release_date
    if(year)
      year = year.substring(0, 4)
    return (
      <div className="col-md-8 col-sm-12 col-xs-12">
        <div className="movie-single-ct main-content">
          <h1 className="bd-hd">
            {this.props.data.title} <span>{year}</span>
          </h1>
          <div className="social-btn">
            <a href="javascript:void(0)" className="parent-btn" onClick={() => this.handleFavorite(this.props.data.id)}>
              <i className="ion-heart" /> Add to Favorite
            </a>
            <div className="hover-bnt">
              <a href="/" className="parent-btn">
                <i className="ion-android-share-alt" />
                share
              </a>
              <div className="hvr-item">
                <a href="/" className="hvr-grow">
                  <i className="ion-social-facebook" />
                </a>
                <a href="/" className="hvr-grow">
                  <i className="ion-social-twitter" />
                </a>
                <a href="/" className="hvr-grow">
                  <i className="ion-social-googleplus" />
                </a>
                <a href="/" className="hvr-grow">
                  <i className="ion-social-youtube" />
                </a>
              </div>
            </div>
          </div>
          <MovieRating rating={this.props.data.vote_average}/>
          <div className="movie-tabs">
            <div className="tabs">
              <ul className="tab-links tabs-mv">
                {this.renderTabTitle("Overview", 1)}
                {this.renderTabTitle("Reviews", 2)}
                {this.renderTabTitle("Cast & Crew", 3)}
                {this.renderTabTitle("Media", 4)}
                {this.renderTabTitle("Related Movies", 5)}
              </ul>
              <div className="tab-content">
                <MovieOverviewTabs data={this.props.data} active={this.state.activeTab === 1}/>
                <MovieReviewsTab data={this.props.data.reviews} title={this.props.data.title} active={this.state.activeTab === 2}/>
                <MovieCastCrewTab data={this.props.data} active={this.state.activeTab === 3}/>
                <MovieMediaTab data={this.props.data} active={this.state.activeTab === 4}/>
                <MovieRelatedTab data={this.props.data} active={this.state.activeTab === 5}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDataDetail;
