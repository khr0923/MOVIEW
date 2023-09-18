import "./MovieDetail.css";
import { useState } from "react";

export default function MovieDetail(props) {
  return (
    <>
      <div className="movie__detail__wrap">
        <div className="movie__info">
          <div className="movie__poster">
            <img className="detail__post__Image" src={props.movie.postImage} />
          </div>
          <div className="movie__data">
            <div className="movie__title__wrap">
              <h1>{props.movie.title}</h1>
              <span></span>
              <p>{props.movie.releasedAt.slice(0, 4)}</p>
            </div>
            <div className="detail__genre__Wrap">
              {props.movie.genres.map((item) => (
                <p className="detail__genre">{item.name}</p>
              ))}
            </div>
            <div className="detail__plot">{props.movie.plot}</div>
          </div>
        </div>
        <div className="detail__staff__wrap">
          <h2 className="detail__title">출연/제작</h2>
          <div className="detail__staff">
            {props.movie.staffs.map((item) =>
              item.role === "감독" ? <p>감독: {item.name} </p> : null
            )}
            {props.movie.staffs.map((item) =>
              item.role === "출연" ? <p>출연진: {item.name} </p> : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}
