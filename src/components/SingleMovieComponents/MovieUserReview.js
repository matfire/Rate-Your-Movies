import React from "react";
import MovieReviewInfoUser from "./MovieReviewInfoUser";
import axios from 'axios'

class MovieUserReview extends React.Component {
  state = {
    data: {}
  }
  componentDidMount() {
    axios.get("https://api.themoviedb.com/3/review/" + this.props.id + "&api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
        this.setState({data: res.data})
        console.log(res.data)
      }
    )
  }
  render() {
    return (
      <div className="mv-user-review-item">
        <MovieReviewInfoUser author={this.state.data.author}/>
        <p>
          {this.state.data.content}
        </p>
      </div>
    );
  }
}

export default MovieUserReview;
