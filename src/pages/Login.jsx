import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "../components/GlobalState";
import "./Login.css";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const login_API =
    "https://moviestates-alternative.codestates-seb.link/auth/login";
  const navigate = useNavigate();

  const [loginTocken, setLoginTocken] = useState();
  const [token, setToken] = useRecoilState(tokenState);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const LoginBtnClick = () => {
    if (!confirmEmail) {
      alert("이메일을 입력해주세요.");
    } else if (!password) {
      alert("비밀번호를 입력해주세요.");
    } else {
      fetch(login_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: confirmEmail,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.accessToken) {
            localStorage.setItem("accessToken", res.accessToken);
            //setLoginTocken(res.accessToken);
            setToken(res.accessToken);
            navigate("/");
            alert("로그인 성공");
          } else {
            alert("로그인 실패");
          }
        });
    }
  };

  const SignUpBtnClick = () => {
    navigate("/signup");
  };

  return (
    <section className="login__container">
      <div className="form__name">로그인</div>
      <form className="login__form">
        <label htmlFor="email">이메일</label>
        <input
          className="Login__input"
          type="email"
          id="email"
          onChange={handleEmailChange}
          placeholder="이메일을 입력해주세요."
        ></input>
        <label htmlFor="password">비밀번호</label>
        <input
          className="Login__input"
          id="password"
          type="password"
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요."
        ></input>
        <button
          type="button"
          className="login__btn login__color"
          onClick={LoginBtnClick}
        >
          로그인
        </button>
        <button
          type="button"
          className="login__btn signup__color"
          onClick={SignUpBtnClick}
        >
          회원가입
        </button>
      </form>
    </section>
  );
}
