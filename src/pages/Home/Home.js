import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import GameRow from "~/components/GameRow";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <GameRow></GameRow>
        <GameRow></GameRow>
      </div>
    </div>
  );
}

export default Home;
