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
  WeiboShareButton,
  WeiboIcon
} from 'react-share';
import { useState, useEffect } from "react";

import styles from "./GameInfo.module.scss";
import * as UserServices from "../../api/services/user";

const cx = classNames.bind(styles);

function GameInfo({ name, authorId, control, description, className, ...passProps }) {
  const [author, setAuthor] = useState({ profile_image: "", username: "" });

  const classes = cx("wrapper", {
    [className]: className,
  });

  useEffect(() => {
    const getAuthor = () => {
      UserServices.getUser(authorId)
        .then(author => {
          setAuthor(author);
        })
        .catch(err => {
          console.log(err);
        })
    };
    getAuthor();
  }, []);

  return (
    <div className={cx(classes)}>
      <h2 className={cx("game-name")}>{name}</h2>
      <div className={cx('creator-container')}>
        <div className={cx("creator")}>
          <img className={cx("creator-image")} src={author.profile_image}></img>
          <span>{author.username}</span>
        </div>
        <div className={cx('share')}>
          <span className={cx('share-item')}>Share: </span>
          <FacebookShareButton
            className={cx('share-item')}
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            className={cx('share-item')}
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <TelegramShareButton
            className={cx('share-item')}
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <RedditShareButton
            className={cx('share-item')}
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
          <WeiboShareButton
            className={cx('share-item')}
            url={window.location.href}
            quote={'Dummy text!'}
            hashtag="#game_arcade"
          >
            <WeiboIcon size={32} round />
          </WeiboShareButton>
        </div>
      </div>
      {control !== "" && (
        <div className={cx("detail")}>
          <h2 className={cx("detail-title")}>Control</h2>
          <p className={cx("detail-content")}>{control}</p>
        </div>
      )}
      {description !== "" && (
        <div className={cx("detail")}>
          <h2 className={cx("detail-title")}>Description</h2>
          <p className={cx("detail-content")}>{description}</p>
        </div>
      )}
    </div>
  );
}

export default GameInfo;
