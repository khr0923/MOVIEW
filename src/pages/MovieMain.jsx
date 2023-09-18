import React from "react";
import MovieList from "../components/MovieList";

import MovieGenreList from "../components/MovieGenreList";
import "../components/MovieGenre.css";

export default function MovieMain(props) {
  const genreName = ["스릴러", "멜로/로맨스", "코메디", "SF", "공포"];
  const genre = [];
  let genreArr = [];

  if (props.genreItems === null) {
    return <div>Loading...</div>;
  } else {
    for (let i = 0; i < genreName.length; i++) {
      genre.push(props.genreItems.filter((item) => item.name === genreName[i]));
    }

    genreArr = genre.flat(1);

    return (
      <>
        <MovieList movieItems={props.movieItems} />
        <MovieGenreList genreArr={genreArr} />
      </>
    );
  }
}
