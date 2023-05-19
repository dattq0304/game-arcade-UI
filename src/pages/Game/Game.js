import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

import styles from "./Game.module.scss";
import GamePlay from "~/components/GamePlay";
import GameRecommend from "~/components/GameRecommend";
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
    } catch (err) {
      console.error("getGame - Client", err);
    }
  };
  getGame();

  const appId = process.env.REACT_APP_FACBOOK_APP_ID;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("main-content")}>
          <GamePlay src={path}></GamePlay>
          <FacebookShareButton
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <GameInfo
            name={name}
            control={control}
            description={description}
            className={cx("detail")}
          ></GameInfo>
        </div>

        <div className={cx("recommened")}>
          <GameRecommend title="Games Recommend" type="Random" size={20}></GameRecommend>
        </div>
      </div>
    </div>
  );
}

export default Game;
