import React from "react";
import MovieGridMovieItem from "./MovieGridMovieItem";



class MovieGridMovieList extends React.Component {

  render() {
    return (
      <div className="flex-wrap-movielist">
        {this.props.data.map((movie, index) => {
          if(index < 9) {
            return(<MovieGridMovieItem key={movie.id} data={movie}/>)
          }
          })
        }
      </div>
    );
  }
}

export default MovieGridMovieList;
