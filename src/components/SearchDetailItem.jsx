import "./SearchDetail.css";
import { Link } from "react-router-dom";

export default function SearchDetailItem(props) {
  const averageScore = props.movie?.averageScore || 0;

  if (props.movie?.postImage !== undefined) {
    return (
      <Link to={`/movie/${props.movie?.id}`}>
        <div className="search__movie__Item">
          <img className="search__movie__Poster" src={props.movie?.postImage} />
          <div className="search__movie__Info">
            <p className="search__movie__Name">{props.movie.title}</p>
            <p className="search__movie__Score">{averageScore.toFixed(1)}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return <div>Loading...</div>;
  }
}
