import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "~/store/userContext";
import styles from "./SavedGames.module.scss";
import * as GameServices from "~/api/services/game";
import GamePreview from "~/components/GamePreview";

const cx = classNames.bind(styles);

function UserSidebar({ toggleSavedGame }) {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(null);
  const gameList = useRef([]);

  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image/`;

  const handleClickInner = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    setLoading(true);
    const savedGamesJSON = localStorage.getItem('savedGames');
    if (savedGamesJSON) {
      const savedGames = JSON.parse(savedGamesJSON);
      Promise.all(savedGames.map(gameId => GameServices.getGameById(gameId)))
        .then(games => {
          gameList.current = games.filter(game => game.active);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return <div className={cx('overlay')} onClick={toggleSavedGame}>
    <div className={cx('container')} onClick={handleClickInner}>
      <div className={cx('header')}>
        <span className={cx('header-title')}>Saved Games</span>
        <FontAwesomeIcon className={cx('close-btn')} icon={faXmark} onClick={toggleSavedGame} />
      </div>
      {loading === null && <div>Loading...</div>}
      {loading === true && <div>Loading game list...</div>}
      {loading === false && gameList.current.length > 0 &&
        <ul className={cx('content')}>
          {gameList.current.map((game, index) => {
            return (
              <li key={index} className={cx("content-item")}>
                <GamePreview
                  previewImage={coverImageUrl + game._id}
                  to={`/game/${game._id}`}
                  name={game.name}
                  onClick={toggleSavedGame}
                ></GamePreview>
              </li>
            );
          })}
        </ul>
      }
      {loading === false && gameList.current.length === 0 &&
        <div className={cx('not-found')}>Save games by click on the <FontAwesomeIcon icon={faBookmark} /> icon on a game page.</div>
      }
    </div>
  </div>
}

export default UserSidebar;
