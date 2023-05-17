import { useRef, useState, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./GameRecommend.module.scss";
import GamePreview from "../GamePreview/GamePreview";
import * as GameServices from "~/api/services/game";

const cx = classNames.bind(styles);

function GameRecommend({ title, type, size = 10 }) {
  const [ready, setReady] = useState(false);
  const gameList = useRef([]);

  const coverImageUrl = "http://localhost:3001/api/game/image/";

  useEffect(() => {
    const getGameList = async () => {
      const res = await GameServices.getGameByType(type, size);
      gameList.current = res;
      if (res.length > 0) {
        setReady(true);
      }
    };
    getGameList();
  }, []);

  return (
    <div className={cx("wrapper")}>
      {ready && (
        <div className={cx("inner")}>
          <label className={cx("title")}>{title}</label>
          <ul className={cx("content")}>
            {gameList.current.map((game, index) => {
              return (
                <li key={index} className={cx("content-item")}>
                  <GamePreview
                    previewImage={coverImageUrl + game._id}
                    to={`/game/${game._id}`}
                  ></GamePreview>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameRecommend;
