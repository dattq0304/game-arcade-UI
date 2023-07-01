import classNames from "classnames/bind";
import { useRef, useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";


import styles from "./GameReviewAction.module.scss";
import * as GameServices from "../../api/services/game";
import * as ReviewService from "../../api/services/review";
import GamePreview from "../GamePreview/GamePreview";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

function GameReviewAction({ toogleGameReviewAction, gameId, addReview }) {
  const [star, setStar] = useState(0);
  const gameList = useRef([]);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Write your comment");
  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image/`;

  const handleClickInner = async (event) => {
    event.stopPropagation();

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (star === 0) {
      return;
    }
    const res = await ReviewService.postReview(
      {
        gameId: gameId,
        star: star,
        content: content
      }
    );
    console.log(res);
    addReview(res.data, res.type);
    toogleGameReviewAction();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("overlay")}>
        <div className={cx("inner")} onClick={handleClickInner}>
          <div className={cx("heading")}>
            <span className={cx("title")}>Rate this game</span>
            <Button text className={cx("close-btn")} onClick={toogleGameReviewAction}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </Button>
          </div>
          <div className={cx("content")}>
            <div className={cx("rating-action")}>
              <FontAwesomeIcon
                className={cx("rating-action__star", star > 0 && "rating-action__star--rated")}
                onClick={() => setStar(1)}
                icon={star > 0 ? faStarSolid : faStarRegular}
              />
              <FontAwesomeIcon
                className={cx("rating-action__star", star > 1 && "rating-action__star--rated")}
                onClick={() => setStar(2)}
                icon={star > 1 ? faStarSolid : faStarRegular}
              />
              <FontAwesomeIcon
                className={cx("rating-action__star", star > 2 && "rating-action__star--rated")}
                onClick={() => setStar(3)}
                icon={star > 2 ? faStarSolid : faStarRegular}
              />
              <FontAwesomeIcon
                className={cx("rating-action__star", star > 3 && "rating-action__star--rated")}
                onClick={() => setStar(4)}
                icon={star > 3 ? faStarSolid : faStarRegular}
              />
              <FontAwesomeIcon
                className={cx("rating-action__star", star > 4 && "rating-action__star--rated")}
                onClick={() => setStar(5)}
                icon={star > 4 ? faStarSolid : faStarRegular}
              />
            </div>
            <div className={cx("input-wrapper")}>
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
              />
            </div>
          </div>
          <Button
            className={cx("submit-btn")}
            primary
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            className={cx("cancle-btn")}
            text
            onClick={toogleGameReviewAction}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameReviewAction;
