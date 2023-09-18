import "./DetailModal.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "../components/GlobalState";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ setDetailModal, detailModal }) {
  const [token, setToken] = useRecoilState(tokenState);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [starColor, setStarColor] = useState("gray");
  const [textValue, setTextValue] = useState("");
  const starArray = [0, 1, 2, 3, 4];
  let commentScore = clicked.filter(Boolean).length;

  const navigate = useNavigate();
  const params = useParams();

  const MovieCommentPost_API = `https://moviestates-alternative.codestates-seb.link/reviews/${params.movieId}`;

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const handleRegisterClick = () => {
    fetch(MovieCommentPost_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: textValue,
        title: "null",
        score: commentScore,
        enjoyPoints: "null",
        tensions: "null",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDetailModal(!detailModal);
      });
  };


  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        clickStates[i] = true;
      } else {
        clickStates[i] = false;
      }
    }
    setClicked(clickStates);
  };

  const LoginBtnClick = () => {
    navigate("/login");
  };

  const SignUpBtnClick = () => {
    navigate("/signup");
  };

  if (token) {
    return (
      <div className="detail__modal__container">
        <div className="detail__modal">
          {/* 모달 취소 버튼 -> MovieCommentItem에서 usestate를 props로 가져와 버튼을 클릭하면 다시 false가 됨 */}
          <Icon
            onClick={() => setDetailModal(!detailModal)}
            className="close_button"
            icon="ion:close-outline"
            color="white"
            width="38px"
          />
          <h1 className="review">리뷰작성</h1>
          <div className="star">
            {starArray.map((el) => (
              <Icon
                onMouseDown={() => handleStarClick(el)}
                icon="ph:star-fill"
                className={clicked[el] && "yellowStar"}
                width="38px"
              />
            ))}
          </div>
          <div className="modal__text">
            <textarea
              placeholder="감상평을 등록해주세요."
              value={textValue}
              onChange={(e) => handleSetValue(e)}
            ></textarea>
          </div>
          <div className="modal__button">
            <button
              className="signup__button detail__button"
              onClick={handleRegisterClick}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="detail__modal__container">
        <div className="detail__modal">
          {/* 모달 취소 버튼 -> MovieCommentItem에서 usestate를 props로 가져와 버튼을 클릭하면 다시 false가 됨 */}
          <Icon
            onClick={() => setDetailModal(!detailModal)}
            className="close_button"
            icon="ion:close-outline"
            color="white"
            width="38px"
          />
          <h1 className="logo">MOVIEW</h1>
          <p>
            평가를 하시려면 로그인이 필요합니다.
            <br />
            회원가입 혹은 로그인하고 평점을 남겨주세요.
          </p>
          <div className="modal__button">
            <button
              className="signup__button detail__button"
              onClick={LoginBtnClick}
            >
              로그인
            </button>
            <button
              className="login__button detail__button"
              onClick={SignUpBtnClick}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    );
  }
}
