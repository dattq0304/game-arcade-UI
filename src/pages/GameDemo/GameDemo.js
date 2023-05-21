import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./GameDemo.module.scss";
import Button from "~/components/Button/Button";
import GamePlay from "~/components/GamePlay";
import * as GameServices from "~/api/services/game";

const cx = classNames.bind(styles);

function Upload() {
  const [gamePath, setGamePath] = useState("");
  const [name, setName] = useState("Review");
  const { id: gameId } = useParams();

  useEffect(() => {
    GameServices.getGameById(gameId).
      then((res) => {
        setGamePath(res.path);
        setName(res.name);
      });
  }, []);

  const handleGobackClick = (e) => {
    window.close();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("review-container")}>
        <h1>{name}</h1>
        <GamePlay src={gamePath}></GamePlay>
        <div className={cx("finish-review")}>
          <Button className={cx("btn")} text border onClick={handleGobackClick}>
            Go Back
          </Button>
          <Button className={cx("btn")} primary to={"/"}>
            Finish review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
