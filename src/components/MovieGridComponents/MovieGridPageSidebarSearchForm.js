import React from "react";
import MovieGridPageSidebarForm from "./MovieGridPageSidebarForm";

class MovieGridPageSidebarSearchForm extends React.Component {
  render() {
    return (
      <div className="searh-form">
        <h4 className="sb-title">Search for movie</h4>
        <MovieGridPageSidebarForm />
      </div>
    );
  }
}

export default MovieGridPageSidebarSearchForm;
