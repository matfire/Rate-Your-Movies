import React from "react";
import MovieCastMember from "./MovieCastMember";


class MovieCasting extends React.Component {
  state = {
    cast : []
  }

  componentWillReceiveProps() {
    this.setState({
      cast: this.props.cast
    })
  }
  renderCast = () => {
    let cast = this.state.cast.map((member, index) => {
      if (index < 10) {
        return(<MovieCastMember cast={member}/>)
      }
    })
    return cast
  }

  render() {
    const cast = this.renderCast()
    return (
      <div className="mvcast-item">
        {cast}
      </div>
    );
  }
}

export default MovieCasting;
