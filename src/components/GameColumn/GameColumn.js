import classNames from "classnames/bind";
import styles from "./GameColumn.module.scss";
import GamePreview from "../GamePreview/GamePreview";

const cx = classNames.bind(styles);

function GameColumn({}) {
  const category = "Recommended";
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
        <ul className={cx("content")}>
          {gameList.map((game, index) => {
            return (
              <li key={index} className={cx("content-item")}>
                <GamePreview
                  small
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

export default GameColumn;
