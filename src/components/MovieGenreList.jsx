import { useState, useEffect } from "react";
import MovieGenreItem from "./MovieGenreItem";

export default function MovieGenreList(props) {
  // const movieId = "079e9098-ff7c-49c7-8d71-fe3fd066aafb";
  // 임시 api 초기값

  const genreName = ["스릴러", "멜로/로맨스", "코메디", "SF", "공포"];
  const movieId = "0e611cb3-4dad-4a76-b516-de703742b7b3";

  const [genreType, setGenreType] = useState(movieId); //장르 id값
  const [genreDisplay, setGenreDisplay] = useState(null);

  const MovieGenreItems_API = `https://moviestates-alternative.codestates-seb.link/movies/genre?page=1&limit=10&genreIds=${genreType}`;

  useEffect(() => {
    fetch(MovieGenreItems_API)
      .then((res) => res.json())
      .then((result) => setGenreDisplay(result)); //id값에 맞는 영화 목록을 보여줌
  }, [genreType]);

  const onButtonClick = (idName) => {
    setGenreType(idName); //id값을 바꿔줌
  };

  if (genreDisplay === null) {
    //return <div>Loading...</div>;
  } else {
    return (
      <section className="movie__genre__List">
        <div className="genre__button_wrap">
          {props.genreArr.map((item) => (
            <button
              key={item.id}
              className="genre__button"
              value={item.id}
              onClick={() => onButtonClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <ul className="genre__items">
          {genreDisplay.data.map((item) => (
            <MovieGenreItem movie={item} key={item.id} />
          ))}
        </ul>
      </section>
    );
  }
}
