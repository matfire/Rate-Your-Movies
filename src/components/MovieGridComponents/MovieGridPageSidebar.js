import React from "react";
import MovieGridPageSidebarSearchForm from "./MovieGridPageSidebarSearchForm";

class MovieGridPageSidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <MovieGridPageSidebarSearchForm />
      </div>
    );
  }
}

export default MovieGridPageSidebar;
