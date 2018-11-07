import React from "react";

class MovieGridPageSidebarForm extends React.Component {
  render() {
    return (
      <form className="form-style-1" action="#">
        <div className="row">
          <div className="col-md-12 form-it">
            <label>Movie name</label>
            <input type="text" placeholder="Enter keywords" />
          </div>
          <div className="col-md-12 ">
            <input className="submit" type="submit" defaultValue="submit" />
          </div>
        </div>
      </form>
    );
  }
}

export default MovieGridPageSidebarForm;
