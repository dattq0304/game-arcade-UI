import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "./GamePlay.module.scss";
import { UserContext } from "~/store/userContext";
import PlayFrame from "../PlayFrame/PlayFrame";

const cx = classNames.bind(styles);

function GamePlay({ title, src, gameId, className, ...passProps }) {
  const playgroundRef = useRef(null);
  const [save, setSave] = useState(false);
  const [ready, setReady] = useState(false);
  const user = useContext(UserContext);

  const classes = cx("wrapper", {
    [className]: className,
  });

  const togglePlaygroundExpand = () => {
    if (!document.fullscreenElement) {
      playgroundRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleSaveClick = () => {
    const savedGamesJSON = localStorage.getItem("savedGames");
    if (!save) {
      if (savedGamesJSON) {
        const savedGames = JSON.parse(savedGamesJSON);
        savedGames.push(gameId);
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
      } else {
        const savedGames = [gameId];
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
      }
    } else {
      if (savedGamesJSON) {
        const savedGames = JSON.parse(savedGamesJSON);
        const index = savedGames.indexOf(gameId);
        if (index !== -1) {
          savedGames.splice(index, 1);
        }
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
      }
    }
    setSave(!save);
  };

  useEffect(() => {
    const elem = playgroundRef.current;

    const handleFullscreenchange = () => {
      elem.classList.toggle(cx("expand"));
    };

    elem.addEventListener("fullscreenchange", handleFullscreenchange);

    return () => {
      elem.removeEventListener("fullscreenchange", handleFullscreenchange);
    };
  }, [playgroundRef]);

  useEffect(() => {
    const getSaveGames = () => {
      const savedGamesJSON = localStorage.getItem("savedGames");
      if (savedGamesJSON) {
        const savedGames = JSON.parse(savedGamesJSON);
        if (savedGames.indexOf(gameId) !== -1) {
          setSave(true);
        }
      }
    };
    getSaveGames();
  }, [user]);

  return (
    <div className={cx(classes)} {...passProps} ref={playgroundRef}>
      <PlayFrame
        className={cx("playframe")}
        src={src}
        title={title}
        gameId={gameId}
      />
      <div className={cx("game-actions")} key={ready}>
        <div className={cx("action")}>
          <FontAwesomeIcon
            icon={save ? faBookmarkSolid : faBookmarkRegular}
            onClick={handleSaveClick}
          ></FontAwesomeIcon>
        </div>
        <div className={cx("action")} onClick={togglePlaygroundExpand}>
          <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
