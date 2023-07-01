import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faBookmark as faBookmarkSolid
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as faBookmarkRegular
} from "@fortawesome/free-regular-svg-icons";
import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "./GamePlay.module.scss";
import { UserContext } from "~/store/userContext";
import PlayFrame from "~/pages/PlayFrame/PlayFrame";

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

  // const handleLikeClick = () => {
  //   if (!user) {
  //     alert('Login is require for this feature');
  //     return;
  //   }
  //   if (liked === 1) {
  //     ReviewServices.unLikeGame(gameId);
  //     setLike(like - 1);
  //     setLiked(0);
  //   } else {
  //     ReviewServices.likeGame(gameId);
  //     if (liked === -1) {
  //       setDisike(dislike - 1);
  //     }
  //     setLike(like + 1);
  //     setLiked(1);
  //   }
  // };

  // const handleDislikeClick = () => {
  //   if (!user) {
  //     alert('Login is require for this feature');
  //     return;
  //   }
  //   if (liked === -1) {
  //     ReviewServices.unLikeGame(gameId);
  //     setDisike(dislike - 1);
  //     setLiked(0);
  //   } else {
  //     ReviewServices.dislikeGame(gameId);
  //     if (liked === 1) {
  //       setLike(like - 1);
  //     }
  //     setDisike(dislike + 1);
  //     setLiked(-1);
  //   }
  // };



  const handleSaveClick = () => {
    const savedGamesJSON = localStorage.getItem('savedGames');
    if (!save) {
      if (savedGamesJSON) {
        const savedGames = JSON.parse(savedGamesJSON);
        savedGames.push(gameId);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
      } else {
        const savedGames = [gameId];
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
      }
    } else {
      if (savedGamesJSON) {
        const savedGames = JSON.parse(savedGamesJSON);
        const index = savedGames.indexOf(gameId);
        if (index !== -1) {
          savedGames.splice(index, 1);
        }
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
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
      const savedGamesJSON = localStorage.getItem('savedGames');
      if (savedGamesJSON) {
        const savedGames = JSON.parse(savedGamesJSON);
        if (savedGames.indexOf(gameId) !== -1) {
          setSave(true);
        }
      }
    }
    getSaveGames();

    // const getReviews = () => {
    //   if (user) {
    //     setReady(true);
    //   }
    //   ReviewServices.getReviews(gameId)
    //     .then(review => {
    //       let numberOfLike = 0;
    //       let numberOfDislike = 0;
    //       review.forEach((data) => {
    //         if (data.like === true) {
    //           numberOfLike++;
    //           if (user && data.user_id === user._id) {
    //             setLiked(1);
    //           }
    //         }
    //         if (data.like === false) {
    //           numberOfDislike++;
    //           if (user && data.user_id === user._id) {
    //             setLiked(-1);
    //           }
    //         }
    //       })
    //       setLike(numberOfLike);
    //       setDisike(numberOfDislike);
    //     })
    // };
    // getReviews();
  }, [user]);

  return (
    <div className={cx(classes)} {...passProps} ref={playgroundRef}>
      {/* <iframe
        className={cx("iframe")}
        src={src}
        title={title}
        allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
        alowfullscreen=""
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
        loading="eager"
        data-hj-allow-iframe="true"
      /> */}
      <iframe
        className={cx("iframe")}
        src={"/play/" + gameId}
        title={title}
        allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
        alowfullscreen=""
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
        loading="eager"
        data-hj-allow-iframe="true"
      />
      <div className={cx("game-actions")} key={ready}>
        {/* <div className={cx("action")}>
          <span>{like > 0 ? like : ''}</span>
          <FontAwesomeIcon icon={liked !== 1 ? faThumbsUpRegular : faThumbsUpSolid} onClick={handleLikeClick}></FontAwesomeIcon>
        </div>
        <div className={cx("action")}>
          <span>{dislike > 0 ? dislike : ''}</span>
          <FontAwesomeIcon icon={liked !== -1 ? faThumbsDownRegular : faThumbsDownSolid} onClick={handleDislikeClick}></FontAwesomeIcon>
        </div> */}
        <div className={cx("action")}>
          <FontAwesomeIcon icon={save ? faBookmarkSolid : faBookmarkRegular} onClick={handleSaveClick}></FontAwesomeIcon>
        </div>
        <div className={cx("action")} onClick={togglePlaygroundExpand}>
          <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
