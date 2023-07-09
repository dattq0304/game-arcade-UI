import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import ReactGA from "react-ga4";

import styles from "./PlayFrame.module.scss";
import * as ViewService from "../../api/services/view";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;

function PlayFrame({ src, title, gameId, className }) {
  // const url = window.location.href;
  // const gameId = url.split("/play/")[1];
  // const [title, setTitle] = useState("");
  // const [src, setSrc] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const res = await GameService.getGameById(gameId);
  //     console.log(res);
  //     setTitle(res.name);
  //     if (res.type === "HTML5") {
  //       setSrc(`${apiUrl}/game/${gameId}/index.html`);
  //     } else {
  //       setSrc(res.path);
  //     }
  //   })();
  // });

  const closeAd = () => {};

  const adCode = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1121928824049141"
      crossorigin="anonymous"></script>
    <!-- test unit -->
    <ins class="adsbygoogle"
      style="display:block; width: 100%; height: 100%;"
      data-ad-client="ca-pub-1121928824049141"
      data-ad-slot="2144143844"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  `;

  const handlePlayButton = () => {
    ReactGA.initialize("G-BT4Y98K8N0");

    ReactGA.send({
      hitType: "pageview",
      page: "/game/" + gameId,
      title: "Game",
    });

    ViewService.addView({ gameId: gameId });

    // ReactGA.event({
    //   category: "your category",
    //   action: "your action",
    //   label: "your label", // optional
    //   value: 99, // optional, must be a number
    //   nonInteraction: true, // optional, true/false
    //   transport: "xhr", // optional, beacon/xhr/image
    // });

    setShowOverlay(false);
  };

  return (
    <div
      className={cx("wrapper", className)}
      style={{ backgroundImage: `url('${apiUrl + "/game/image/" + gameId}')` }}
    >
      {/* <div className={cx("ad")} dangerouslySetInnerHTML={{ __html: adCode }} /> */}
      {showOverlay ? (
        <div className={cx("overlay")}>
          <img
            className={cx("logo")}
            src="/static/media/logo192.bd0d665c5c5d3de71a6a.png"
            alt="Game Arcade"
          />
          <Button
            className={cx("play-btn")}
            primary
            leftIcon={<FontAwesomeIcon icon={faCirclePlay} />}
            onClick={handlePlayButton}
          >
            Click to play
          </Button>
        </div>
      ) : (
        <iframe
          className={cx("iframe")}
          src={src}
          title={title}
          allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
          alowfullscreen=""
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
          loading="eager"
          data-hj-allow-iframe="true"
        />
      )}
    </div>
  );
}

export default PlayFrame;
