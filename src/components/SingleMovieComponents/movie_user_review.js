import React from "react";
import MovieReviewInfoUser from "./movie_review_info_user";

class MovieUserReview extends React.Component {
  render() {
    return (
      <div className="mv-user-review-item">
        <MovieReviewInfoUser />
        <p>
          This is by far one of my favorite movies from the MCU. The
          introduction of new Characters both good and bad also makes the movie
          more exciting. giving the characters more of a back story can also
          help audiences relate more to different characters better, and it
          connects a bond between the audience and actors or characters. Having
          seen the movie three times does not bother me here as it is as
          thrilling and exciting every time I am watching it. In other words,
          the movie is by far better than previous movies (and I do love
          everything Marvel), the plotting is splendid (they really do out do
          themselves in each film, there are no problems watching it more than
          once.
        </p>
      </div>
    );
  }
}

export default MovieUserReview;
