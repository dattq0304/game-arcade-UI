import classNames from "classnames/bind";
import { useRef, useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";

import styles from "./DeveloperGames.module.scss";
import * as GameServices from "../../api/services/game";
import GamePreview from "../GamePreview/GamePreview";

const cx = classNames.bind(styles);

function DeveloperGames({ toogleShowDeveloperGames, authorId, authorName }) {
  const [isLoading, setIsLoading] = useState(true);
  const gameList = useRef([]);
  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image/`;

  const handleClickInner = async (event) => {
    event.stopPropagation();

  };

  useEffect(() => {
    (async () => {
      const res = await GameServices.getGameByCreator(authorId);
      gameList.current = res;
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("overlay")}>
        <div className={cx("inner")} onClick={handleClickInner}>
          <div className={cx("heading")}>
            <span className={cx("title")}>Games by {authorName}</span>
            <div className={cx("close-btn")} onClick={toogleShowDeveloperGames}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </div>
          </div>
          {isLoading
            ? (<div className={cx("loading")}><Spin size="large" /></div>)
            :
            (<div className={cx("content")}>
              {gameList.current.map((game, index) => {
                return (
                  <div key={index} className={cx("content-item")}>
                    <GamePreview
                      previewImage={coverImageUrl + game._id}
                      to={`/game/${game._id}`}
                      name={game.name}
                    ></GamePreview>
                  </div>
                );
              })}
            </div>)}
        </div>
      </div>
    </div>
  );
}

export default DeveloperGames;
