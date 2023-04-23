import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import GameRow from "~/components/GameRow";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <GameRow title="New game" type="new"></GameRow>
        <GameRow title="Random" type="random"></GameRow>
        <GameRow title="2 players" category="2 players"></GameRow>
        <GameRow title="Action" category="Action"></GameRow>
        <GameRow title="Sport" category="Sport"></GameRow>
        <GameRow title="Puzzle" category="Puzzle"></GameRow>
        <GameRow title="Car" category="Car"></GameRow>
      </div>
    </div>
  );
};

export default Home;
