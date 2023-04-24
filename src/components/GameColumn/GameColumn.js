import { useRef, useState } from "react";
import axios from "axios";

import classNames from "classnames/bind";
import styles from "./GameColumn.module.scss";
import GamePreview from "../GamePreview/GamePreview";

const cx = classNames.bind(styles);

const GameColumn = ({ title, type, category }) => {
  const [ready, setReady] = useState(false);
  const gameList = useRef([]);

  const gamePlayUrl = "http://localhost:3000/game/";
  const coverImageUrl = "http://localhost:3001/api/game/image/";

  const getGameList = async () => {
    try {
      let url = "";
      if (category) {
        url = `http://localhost:3001/api/game/category/${category}`;
      } else if (type) {
        url = `http://localhost:3001/api/game/${type}`;
      }

      const res = await axios.get(url);
      gameList.current = res.data;
      if (res.data.length > 0) {
        setReady(true);
      }
      console.log("getGameList - Server:", res);
    } catch (err) {
      console.error("getGameList - Client", err);
    }
  };
  getGameList();

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
                    to={gamePlayUrl + game._id}
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

export default GameColumn;
