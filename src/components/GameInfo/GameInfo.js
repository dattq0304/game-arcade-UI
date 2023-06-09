import classNames from "classnames/bind";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./GameInfo.module.scss";
import * as UserServices from "../../api/services/user";
import * as ViewService from "../../api/services/view";
import DeveloperGames from "../DeveloperGames/DeveloperGames";

const cx = classNames.bind(styles);

function GameInfo({
  name,
  authorId,
  gameId,
  control,
  category,
  description,
  className,
  date,
  ...passProps
}) {
  const [author, setAuthor] = useState({ profile_image: "", username: "" });
  const [formattedDate, setFormattedDate] = useState("");
  const [showDeveloperGames, setShowDeveloperGames] = useState(false);
  const [view, setView] = useState(0);

  const classes = cx("wrapper", {
    [className]: className,
  });

  useEffect(() => {
    const convertDate = (date) => {
      const newDate = new Date(date);
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();
      const year = newDate.getFullYear();
      setFormattedDate(`${month}/${day}/${year}`);
    };
    convertDate(date);

    init();
  }, []);

  const toogleShowDeveloperGames = () => {
    setShowDeveloperGames(!showDeveloperGames);
  };

  const init = () => {
    UserServices.getUser(authorId)
      .then((author) => {
        setAuthor(author);
      })
      .catch((err) => {
        console.log(err);
      });

    ViewService.getView({ gameId: gameId })
      .then((view) => {
        console.log(view);
        setView(view.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx(classes)}>
      <h2 className={cx("game-name")}>{name}</h2>
      <div className={cx("creator-container")}>
        <div className={cx("creator")} onClick={toogleShowDeveloperGames}>
          <img
            className={cx("creator-image")}
            src={author.profile_image}
            alt="avatar"
          ></img>
          <span>{author.username}</span>
          {showDeveloperGames && (
            <DeveloperGames
              toogleShowDeveloperGames={toogleShowDeveloperGames}
              authorId={authorId}
              authorName={author.username}
            ></DeveloperGames>
          )}
        </div>
        <div className={cx("share")}>
          <span className={cx("share-item")}>Share: </span>
          <FacebookShareButton
            className={cx("share-item")}
            url={window.location.href}
            quote={"Play with me"}
            hashtag="#game_arcade"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            className={cx("share-item")}
            url={window.location.href}
            title={"Play with me"}
            hashtags={["game_arcade", "project_2"]}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <TelegramShareButton
            className={cx("share-item")}
            url={window.location.href}
            title={"Play with me"}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <RedditShareButton
            className={cx("share-item")}
            url={window.location.href}
            title={"Play with me"}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
          <LinkedinShareButton
            className={cx("share-item")}
            url={window.location.href}
            title={"Play with me"}
            hashtags={["game_arcade", "project_2"]}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      </div>
      {formattedDate.length !== 0 && <span>Publish at: {formattedDate}</span>}
      <br />
      <span>
        Category:{" "}
        <Link className={cx("category-link")} to={`/?category=${category}`}>
          {category}
        </Link>
      </span>
      <br />
      <span>Total play: {view}</span>

      {control !== "" && (
        <div className={cx("detail")}>
          <h3 className={cx("detail-title")}>Control</h3>
          <p className={cx("detail-content")}>{control}</p>
        </div>
      )}
      {description !== "" && (
        <div className={cx("detail")}>
          <h3 className={cx("detail-title")}>Description</h3>
          <p className={cx("detail-content")}>{description}</p>
        </div>
      )}
    </div>
  );
}

export default GameInfo;
