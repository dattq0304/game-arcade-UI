import { useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import axios from "axios";

import styles from "./GameDemo.module.scss";
import Button from "~/components/Button/Button";
import GamePlay from "~/components/GamePlay";

const cx = classNames.bind(styles);

function Upload() {
  const [gamePath, setGamePath] = useState("");
  const [name, setName] = useState("Review");
  const { id } = useParams();

  const goToPreviewGameScreen = async () => {
    try {
      const url = `http://localhost:3001/api/game/${id}`;
      const res = await axios.get(url);
      setName(res.data.name);
      if (res.data.type === "HTML5") {
        setGamePath(`${url}/index.html`);
      } else {
        setGamePath(res.data.path);
      }
      console.log(url);

      console.log("goToPreviewGameScreen - Server:", res);
    } catch (err) {
      console.error("goToPreviewGameScreen - Client", err);
    }
  };
  goToPreviewGameScreen();

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
          <Button className={cx("btn")} primary to={"http://localhost:3000/"}>
            Finish review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
