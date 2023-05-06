import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./GameRow.module.scss";
import GamePreview from "../GamePreview/GamePreview";
import * as GameServices from "~/api/services/game";

const cx = classNames.bind(styles);

function GameRow({ title, category, type }) {
  const [ready, setReady] = useState(false);
  const gameList = useRef([]);

  const gamePlayUrl = "http://localhost:3000/game/";
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

          {/* <div className={cx("icon-wrapper", "icon-next")}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </div>

          <div className={cx("icon-wrapper", "icon-prev")}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </div> */}

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

export default GameRow;
