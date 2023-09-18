import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const navigate = useNavigate();
  const signUp_API =
    "https://moviestates-alternative.codestates-seb.link/auth/register";

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/; //이메일 정규식

  const validateEmail = (input) => {
    return emailRegEx.test(input);
  };

  const validatePassword = (input) => {
    if (input.length < 8 || input.length > 16) {
      return false;
    }

    // 영문, 숫자, 특수문자가 모두 포함되어 있는지 확인
    const hasUppercase = /[A-Z]/.test(input);
    const hasLowercase = /[a-z]/.test(input);
    const hasDigit = /\d/.test(input);
    const hasSpecialChar = /[!@#$%^&*()\-_=+[\]{}|;:'",<.>/?\\]/.test(input);

    if (!(hasUppercase && hasLowercase && hasDigit && hasSpecialChar)) {
      return false;
    }

    return true;
  };

  const isPasswordMatch = (input) => {
    if (password !== input) {
      return false;
    }
    return true;
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };

  const handlePasswordMatch = (event) => {
    setConfirmPW(event.target.value);
    event.preventDefault();
  };

  const signUpBtnClick = () => {
    if (
      name.length !== 0 &&
      validateEmail(email) &&
      validatePassword(password) &&
      isPasswordMatch(confirmPW)
    ) {
      fetch(signUp_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          name: null,
          birth: null,
          nickname: name,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          navigate("/login");
          alert("회원가입 성공");
        });
    } else {
      if (name.length === 0) {
        alert("이름을 입력해주세요.");
      } else if (!validateEmail(email)) {
        alert("이메일 형식에 맞게 입력해주세요.");
      } else if (!validatePassword(password)) {
        alert("비밀번호 형식에 맞게 입력해주세요.");
      } else {
        alert("비밀번호가 맞는지 확인해주세요.");
      }
    }
  };

  return (
    <section className="login__container">
      <div className="form__name">회원가입</div>
      <form className="login__form">
        {/* 유저 이름 */}
        <label htmlFor="name">이름</label>
        <input
          className="Login__input"
          id="name"
          placeholder="이름을 입력해주세요."
          onChange={handleNameChange}
        ></input>
        {/* 생년월일 */}
        <label htmlFor="birth">생년월일</label>
        <input className="Login__input" type="date" id="birth"></input>
        {/* 이메일 */}
        <label htmlFor="email" required autofocus>
          이메일
        </label>
        <input
          className="Login__input"
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          onChange={handleEmailChange}
        ></input>
        {email.length === 0 ? null : validateEmail(email) ? (
          <p className="isEmail">사용 가능한 이메일입니다.</p>
        ) : (
          <p className="isNotEmail">이메일 형식을 지켜주세요.</p>
        )}
        {/* 비밀번호 */}
        <label htmlFor="pwd">비밀번호</label>
        <input
          className="Login__input"
          type="password"
          id="pwd"
          placeholder="비밀번호를 입력해주세요."
          onChange={handlePasswordChange}
        ></input>
        {password.length === 0 ? null : validatePassword(password) ? (
          <p className="isValidPW">사용 가능한 비밀번호입니다.</p>
        ) : (
          <p className="isNotValidPW">
            영문, 대소문자, 특수문자를 조합하여 입력해주세요.(8-16자)
          </p>
        )}
        {/* 비밀번호 확인 */}
        <label htmlFor="pwdcheck">비밀번호 확인</label>
        <input
          className="Login__input"
          type="password"
          id="pwdcheck"
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={handlePasswordMatch}
        ></input>
        {confirmPW.length === 0 ? null : isPasswordMatch(confirmPW) ? (
          <p className="isMatchPW">비밀번호가 일치합니다.</p>
        ) : (
          <p className="isNotMatchPW">비밀번호가 일치하지 않습니다.</p>
        )}
        {/* 회원가입 버튼 */}
        <button
          type="button"
          className="login__btn login__color"
          onClick={signUpBtnClick}
        >
          회원가입
        </button>
      </form>
    </section>
  );
}
