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
        <GameRow title="Action" category="Action"></GameRow>
        <GameRow title="Sport" category="Sport"></GameRow>
        <GameRow title="Quiz" category="Quiz"></GameRow>
        <GameRow title="Gun" category="Gun"></GameRow>
        <GameRow title="Puzzle" category="Puzzle"></GameRow>
        <GameRow title="Beauty" category="Beauty"></GameRow>
        <GameRow title="Gambling" category="Gambling"></GameRow>
        <GameRow title="Car" category="Car"></GameRow>
        <GameRow title="Bike" category="Bike"></GameRow>
        <GameRow title="Jet Fighter" category="Jet Fighter"></GameRow>
        <GameRow title="2 players" category="2 players"></GameRow>
        <GameRow title="Minecraft" category="Minecraft"></GameRow>
        <GameRow title="Other" category="Other"></GameRow>
      </div>
    </div>
  );
};

export default Home;
