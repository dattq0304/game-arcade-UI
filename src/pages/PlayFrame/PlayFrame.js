import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./PlayFrame.module.scss";
import * as GameService from "../../api/services/game";

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;

function PlayFrame() {
  const url = window.location.href;
  const gameId = url.split("/play/")[1];
  const [title, setTitle] = useState('');
  const [src, setSrc] = useState('');

  useEffect(() => {
    (async () => {
      const res = await GameService.getGameById(gameId);
      setTitle(res.name);
      if (res.type === "HTML5") {
        setSrc(`${apiUrl}/game/${gameId}/index.html`);
      } else {
        setSrc(res.path);
      }
    })();
  });

  const closeAd = () => {

  };

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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("ad")} dangerouslySetInnerHTML={{ __html: adCode }} />
      {/* <div className={cx("ad")}>
        This is adCode
      </div> */}
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
    </div>
  );
}

export default PlayFrame;
