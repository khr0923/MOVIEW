import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import MovieComment from "../components/MovieComment";
import MovieRelatedList from "../components/MovieRelatedList";

export default function MovieDetailPage() {
  const params = useParams();
  const MovieDetail_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/detail`;
  const MovieComment_API = `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieId}`;
  const [movieData, setMovieData] = useState(null);
  const [movieComment, setMovieComment] = useState(null);

  const movieRelated_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/related`;
  const [movieRelated, setMovieRelated] = useState(null);
  //연관 영화 데이터 api를 통해 얻어옴

  useEffect(() => {
    fetch(MovieDetail_API)
      .then((res) => res.json())
      .then((result) => setMovieData(result));
  }, [params.movieId]);

  useEffect(() => {
    fetch(MovieComment_API)
      .then((res) => res.json())
      .then((result) => setMovieComment(result));
  }, [params.movieId, movieComment]);

  useEffect(() => {
    fetch(movieRelated_API)
      .then((res) => res.json())
      .then((result) => setMovieRelated(result));
  }, [params.movieId]);

  // ***제일 막혔던 부분 - 상세페이지에서 연관영화를 클릭하면 해당 영화의 상세페이지로 다시 렌더링 돼야 함: 원래 전의 코드에선  useEffect를 사용할 때 빈배열을 주었는데 그렇게 하면 처음 한번만 실행하게 되어 url만 바뀌고 화면이 리렌더링 되지 않는 문제 발생(url 바뀌고 새로고침하면 화면이 잘 바뀌는 것 확인 했음)
  //새로고침을 하지 않고 리렌더링 하기 위 배열에 params.movieId를 주어 id값이 바뀔때마다 데이터를 가져와 화면이 렌더링되게 함

  // postImage를 읽어오려는데 null값이 떠서 옵셔널 체이닝(?) -> 배열 안에 값이 null값이면 무시하고? 넘어감
  const backgroundimg = movieData?.postImage;

  return (
    <MovieDetailContainer backgroundimg={backgroundimg}>
      <div className="movie__detail__background">
        {movieData === null ? (
          <div>Loading...</div>
        ) : (
          <MovieDetail movie={movieData} />
        )}
        {movieComment === null ? (
          <div>Loading...</div>
        ) : (
          <MovieComment movieComment={movieComment} />
        )}
        {movieRelated === null ? (
          <div>Loading...</div>
        ) : (
          <MovieRelatedList movieRelated={movieRelated} />
        )}
      </div>
    </MovieDetailContainer>
  );
}

// 배경 그라데이션 넣어줌 태그 안에 css를 넣으려니 잘 안되서 styled-components라는 react전용 css?를 사용함
// styled-components는 변수로 css를 사용할 수 있게 되어 있어서 props를 전달할 수 있다고 함
const MovieDetailContainer = styled.section`
  background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.25) 20%,
      rgba(20, 20, 20, 0.4) 30%,
      rgba(20, 20, 20, 0.6) 40%,
      rgba(20, 20, 20, 1) 65%
    ),
    ${(props) => `url(${props.backgroundimg}) no-repeat top center`};
  background-size: 100%;
  width: 100%;
  padding-top: 250px;
  /* filter: blur(30px); */
`;
