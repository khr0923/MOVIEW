import { Link } from "react-router-dom";
import "./MovieHover.css";

export default function MovieGenreItem(props) {
  // console.log(props.movie)
  //console.log(props.movie.runtime)

  //const averageScore = props.movie.averageScore || 0;

  return (
    <Link className="genre__item__wrap" to={`/Movie/${props.movie.id}`}>
      <div className="genre__item">
        <div className="banner_img">
          <img className="genre__post__Image" src={props.movie.postImage} />
          <div className="hover_info_wrap">
            <div className="hover_info">
              <div className="hover_title_wrap">
                <p className="hover_text_title">{props.movie.title}</p>
                <p className="hover_text_runtime">{props.movie.runtime}분</p>
              </div>
              <p className="hover_text_plot">
                {props.movie.plot.length > 80
                  ? `${props.movie.plot.slice(0, 80)}...`
                  : props.movie.plot}
              </p>
              <p className="hover_text_comment"></p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
