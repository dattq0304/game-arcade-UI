import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Game.module.scss";
import GamePlay from "~/components/GamePlay";
import GameRecommend from "~/components/GameRecommend";
import GameInfo from "~/components/GameInfo";
import * as GameServices from "~/api/services/game";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function Game() {
  const { id } = useParams();
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("");
  const [date, setDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [gameId, setGameId] = useState("");
  const [category, setCategory] = useState("");
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image`;

  useEffect(() => {
    const getGame = async () => {
      try {
        GameServices.getGameById(id)
          .then(res => {
            setName(res.name);
            setDescription(res.description);
            setControl(res.control);
            setGameId(res._id);
            setCategory(res.category);
            setAuthorId(res.creator_id);
            setDate(res.modified_date);
            if (res.type === "HTML5") {
              setPath(`${process.env.REACT_APP_API_URL}/game/${id}/index.html`);
            } else {
              setPath(res.path);
            }
            setReady(true);
          })
      }
      catch (err) {
        console.error("getGame - Client", err);
      }
    };
    getGame();
  }, [location]);

  return (
    <Fragment>
      {gameId && <div className={cx("wrapper")} style={{ backgroundImage: `url('${coverImageUrl + "/" + gameId}')` }}>
        <div className={cx("overlay")} >
          <div className={cx("inner")} key={gameId}>
            {ready && <div className={cx("main-content")}>
              <GamePlay src={path} gameId={gameId}></GamePlay>
              <GameInfo
                name={name}
                control={control}
                date={date}
                description={description}
                className={cx("detail")}
                authorId={authorId}
                category={category}
              ></GameInfo>
            </div>}

            <div className={cx("recommened")}>
              <GameRecommend title="Games Recommend" type="Random" size={20}></GameRecommend>
            </div>
          </div>
        </div>
      </div>}
    </Fragment>
  );
}

export default Game;
