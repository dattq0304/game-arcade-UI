import { useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";
import styles from "./GameTable.module.scss";
import GamePreview from "../GamePreview/GamePreview";
import * as GameServices from "~/api/services/game";

const cx = classNames.bind(styles);

function GameTable({ title, category, type }) {
  const [ready, setReady] = useState(false);
  const gameList = useRef([]);

  const coverImageUrl = "http://localhost:3001/api/game/image/";

  useEffect(() => {
    const getGameList = async () => {
      const res = await GameServices.getGameList(category, type);
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

export default GameTable;
