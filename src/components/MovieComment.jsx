import MovieCommentItem from "./MovieCommentItem";
import "./MovieComment.css";

export default function MovieComment(props) {
  return (
    <>
      <MovieCommentItem movieComment={props.movieComment} />
    </>
  );
}
