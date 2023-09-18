import React from "react";
import "./MovieComment.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import DetailModal from "./DetailModal";
import { useRecoilState } from "recoil";
import { tokenState } from "../components/GlobalState";

export default function MovieCommentItem(props) {
  const [detailModalLogin, setDetailModalLogin] = useState(false);
  const [detailModalComment, setDetailModalComment] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);

  return (
    <div className="comment__item__container">
      <h2 className="detail__title">
        <span className="title__count">
          코멘트
          <span className="comment__count">{props.movieComment.length}</span>
        </span>

        <span
          className="comment__write"
          onClick={() =>
            token ? setDetailModalComment(true) : setDetailModalLogin(true)
          }
        >
          <span>작성하기</span>
          <Icon icon="ph:pencil-line" />
        </span>
      </h2>

      {detailModalLogin === true ? (
        <DetailModal
          detailModal={detailModalLogin}
          setDetailModal={setDetailModalLogin}
        />
      ) : null}
      {detailModalComment === true ? (
        <DetailModal
          detailModal={detailModalComment}
          setDetailModal={setDetailModalComment}
        />
      ) : null}
      {props.movieComment.length === 0 ? (
        <>
          <div className="try__comment__box">
            <div classsName="try__comment">코멘트를 작성해보세요!</div>
          </div>
        </>
      ) : (
        <div>
          <ul className="comment__item__wrap">
            {props.movieComment.map((item) => (
              <li className="comment__item__box">
                <div className="comment__user__info">
                  <span>{item.user.nickname}</span>
                  <div className="comment__score">
                    <Icon
                      className="star_icon"
                      icon="ic:round-star"
                      color="#a7a7a7"
                      vFlip={true}
                    />
                    <span>{item.score}</span>
                  </div>
                </div>
                <div className="user__comment">
                  <span>{item.content}</span>
                </div>
                <div className="comment__like">
                  <Icon
                    className="like_icon"
                    icon="ant-design:like-filled"
                    color="#a7a7a7"
                  />
                  <span>{item.likeCount}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
