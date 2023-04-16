import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./GameRow.module.scss";
import GamePreview from "../GamePreview/GamePreview";

const cx = classNames.bind(styles);

function GameRow({}) {
  const category = "New Game";
  const gameList = [
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
    {
      to: "http://localhost:3000/game",
      name: "fake name",
      previewImage:
        "https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <label className={cx("title")}>{category}</label>

        {/* <div className={cx("icon-wrapper", "icon-next")}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </div>

        <div className={cx("icon-wrapper", "icon-prev")}>
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </div> */}

        <ul className={cx("content")}>
          {gameList.map((game, index) => {
            return (
              <li key={index} className={cx("content-item")}>
                <GamePreview
                  medium
                  previewImage={game.previewImage}
                  to={game.to}
                ></GamePreview>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default GameRow;
