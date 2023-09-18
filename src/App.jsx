import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieMain from "./pages/MovieMain";
import MovieDetailPage from "./pages/MovieDetailPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieFooter from "./components/MovieFooter";
import SearchDetail from "./pages/SearchDetail";
import logo from "./img/logo.png";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { tokenState } from "./components/GlobalState";
import MovieHeader from "./components/MovieHeader";

export default function App() {
  const login_API =
    "https://moviestates-alternative.codestates-seb.link/auth/login";

  const [genreItems, setGenreItems] = useState(null);
  const MovieGenre_API =
    "https://moviestates-alternative.codestates-seb.link/movies/genres";

  const SERVER_API =
    "https://moviestates-alternative.codestates-seb.link/movies/top"; // 서버 API주소

  const [movieItems, setMovieItems] = useState([]);

  // search기능
  const [movieTitle, setMovieTitle] = useState("");
  // const [tempInput, setTempInput] = useState("");
  const [searchHandle, setSearchHandle] = useState("");
  const [searchDisplay, setSearchDisplay] = useState("");
  const MOVIE_API = `https://moviestates-alternative.codestates-seb.
link/movies?page=1&limit=20&title=${searchHandle}`;

  //const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [isToken, setIsToken] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  //let isToken = false;

  // useEffect(() => {

  //   if (localStorage.getItem('accessToken') === null) {
  //     setIsToken(false)
  //     console.log("로그인 필요")
  //   }
  //   else {
  //     setIsToken(true);

  //     console.log("로그인 유지")
  //   }
  // }, []);

  const handleLogoutClick = () => {
    console.log("로그아웃");
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  const searchChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleClick = () => {
    setMovieTitle("");
    setSearchHandle(movieTitle);
  };

  useEffect(() => {
    //setLoading(true);

    fetch(MOVIE_API)
      .then((res) => res.json())
      .then((result) => setSearchDisplay(result.data));
    //json으로 바꾼 형태: result
    //setLoading(false);
  }, [searchHandle]);

  useEffect(() => {
    //setLoading(true);

    fetch(SERVER_API)
      .then((res) => res.json())
      .then((result) => setMovieItems(result.data));
    //json으로 바꾼 형태: result

    //setLoading(false);
  }, []);

  useEffect(() => {
    //setLoading(true);

    fetch(MovieGenre_API)
      .then((res) => res.json())
      .then((result) => setGenreItems(result));

    //setLoading(false);
  }, []);

  // 헤더 픽스
  const [fixedHeader, setFixedHeader] = useState(0);

  const updateScroll = () => {
    setFixedHeader(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  });

  return (
    <>
      <header className={fixedHeader > 100 ? "fixed_header" : "header"}>
        <div className="header__wrap">
          <Link className="logo" to="/">
            <img className="mainlogo" src={logo} />
          </Link>
          <nav>
            <div className="search__bar">
              <input value={movieTitle} onChange={searchChange} />
              <Link className="search_btn" to="/searchDetail">
                <Icon
                  className="search"
                  icon="il:search"
                  onClick={handleClick}
                />
              </Link>
            </div>
            {token ? (
              <div className= "logout" onClick={handleLogoutClick}>로그아웃</div>
            ) : (
              <Link className="login" to="/login">
                <div>로그인</div>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <MovieMain genreItems={genreItems} movieItems={movieItems} />
            }
          />
          <Route
            path="/movie/:movieId"
            element={<MovieDetailPage genreItems={genreItems} />}
          />
          <Route path="/login" element={<Login movieItems={movieItems} />} />
          <Route path="/signup" element={<SignUp movieItems={movieItems} />} />
          <Route
            path="/searchDetail"
            element={
              <SearchDetail
                searchDisplay={searchDisplay}
                searchHandle={searchHandle}
              />
            }
          />
        </Routes>
      </main>
      <MovieFooter />
    </>
  );
}
