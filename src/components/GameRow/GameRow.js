import { useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";
import styles from "./GameRow.module.scss";
import GamePreview from "../GamePreview/GamePreview";
import * as GameServices from "~/api/services/game";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function GameRow({ title, category, type }) {
  const [ready, setReady] = useState(false);
  const gameList = useRef([]);

  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image/`;

  useEffect(() => {
    const getGameList = async () => {
      let res;
      if (category) {
        res = await GameServices.getGameByCategory(category);
      } else if (type) {
        res = await GameServices.getGameByType(type);
      }
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
          <div className={cx("header")}>
            <label className={cx("title")}>{title}</label>
            <Link className={cx("view-more")} to={category ? `/?category=${category}` : `/?type=${type}`}>view more</Link>
          </div>
          <ul className={cx("content")}>
            {gameList.current.map((game, index) => {
              return (
                <li key={index} className={cx("content-item")}>
                  <GamePreview
                    previewImage={coverImageUrl + game._id}
                    to={`/game/${game._id}`}
                    name={game.name}
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

export default GameRow;
