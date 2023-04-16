import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./GamePlay.module.scss";

const cx = classNames.bind(styles);

function GamePlay({ title, src, className, ...passProps }) {
  const playgroundRef = useRef(null);

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

  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)} {...passProps} ref={playgroundRef}>
      <iframe
        className={cx("iframe")}
        src={src}
        title={title}
        allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
        alowFullScreen=""
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
        loading="eager"
        data-hj-allow-iframe="true"
      ></iframe>
      <div className={cx("game-actions")}>
        <div className={cx("action")} onClick={togglePlaygroundExpand}>
          <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

GamePlay.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
};

export default GamePlay;
