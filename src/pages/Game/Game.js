import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";

import styles from "./Game.module.scss";
import GamePlay from "~/components/GamePlay";
import GameColumn from "~/components/GameColumn";
import GameInfo from "~/components/GameInfo";

const cx = classNames.bind(styles);

function Game() {
  const { id } = useParams();
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("");

  const getGame = async () => {
    try {
      const url = `http://localhost:3001/api/game/${id}`;
      const res = await axios.get(url);

      setName(res.data.name);
      setDescription(res.data.description);
      setControl(res.data.control);

      if (res.data.type === "HTML5") {
        setPath(`${url}/index.html`);
      } else {
        setPath(res.data.path);
      }

      console.log("getGame - Server:", res);
    } catch (err) {
      console.error("getGame - Client", err);
    }
  };
  getGame();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("main-content")}>
          <GamePlay src={path}></GamePlay>
          <GameInfo
            name={name}
            control={control}
            description={description}
            className={cx("detail")}
          ></GameInfo>
        </div>

        <div className={cx("recommened")}>
          <GameColumn title="Recommened" type="random"></GameColumn>
        </div>
      </div>
    </div>
  );
}

export default Game;
