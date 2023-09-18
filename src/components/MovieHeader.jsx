import "./MovieHeader.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MovieHeader(props) {
  console.log(props.movieTitle);

  return (
    <header>
      <div className="header__wrap">
        <Link className="logo" to="/">
          {/* <h1>MOVIEW</h1> */}
        </Link>
        <nav>
          <div>
            <input onChange={props.searchChange}></input>
            <button onClick={props.SearchHandle}>검색</button>
          </div>
          <Link className="login" to="/login">
            로그인
          </Link>
          <Link className="sign__up" to="/signup">
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
}
