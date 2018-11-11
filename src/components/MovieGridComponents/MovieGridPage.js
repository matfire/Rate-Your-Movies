import React from "react";
import MovieGridMovieList from "./MovieGridMovieList";
import MovieGridPageSearchComponent from "./MovieGridPageSearchComponent";
import MovieSinglePageHero from '../SingleMovieComponents/MovieSinglePageHero'
import axios from 'axios'

class MovieGridPage extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div class="hero common-hero">
        	<div class="container">
        		<div class="row">
        			<div class="col-md-12">
        				<div class="hero-ct">
        				</div>
        			</div>
        		</div>
        	</div>
        </div>

        <div className="page-single">
          <div className="container">
            <div className="row ipad-width">
              <div className="col-md-8 col-sm-12 col-xs-12">
                <MovieGridMovieList data={this.props.data}/>
              </div>
              <MovieGridPageSearchComponent />
            </div>
          </div>
        </div>
     </React.Fragment>
    );
  }
}

export default MovieGridPage;
