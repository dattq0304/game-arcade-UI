import classNames from "classnames/bind";

import styles from "./Game.module.scss";
import GamePlay from "~/components/GamePlay";
import GameColumn from "~/components/GameColumn";
import GameInfo from "~/components/GameInfo";

const cx = classNames.bind(styles);

function Game() {
  const game = {
    name: "Snake Hunt",
    src: "https://js13kgames.com/games/super-chrono-portal-maker/index.html",
    description:
      "The objective of the game is to control a snake to hunt for food in the form of mice. The more mice the snake eats, the longer it becomes. The game is over when the snake collides with the walls or its own body.",
    control:
      "The player can control the snake using the arrow keys or WASD keys on the keyboard.",
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("main-content")}>
          <GamePlay src={game.src}></GamePlay>
          <GameInfo
            name={game.name}
            control={game.control}
            description={game.description}
            className={cx("detail")}
          ></GameInfo>
        </div>

        <div className={cx("recommened")}>
          <GameColumn></GameColumn>
        </div>
      </div>
    </div>
  );
}

export default Game;
