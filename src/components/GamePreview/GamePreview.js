import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./GamePreview.module.scss";

const cx = classNames.bind(styles);

function GamePreview({
  to,
  previewImage,
  name,
  className,
  hot = false,
  recent = false,
  toprated = false,
  ...passProps
}) {
  const props = {
    ...passProps,
  };

  const classes = cx("wrapper", {
    [className]: className,
    hot,
    recent,
    toprated,
  });

  return (
    <div className={classes} {...props}>
      <Link to={to}>
        <label className={cx("status")}></label>
        <div
          className={cx("game-image")}
          style={{ backgroundImage: `url('${previewImage}')` }}
        >
          <div className={cx("game-name")}>
            <span>{name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GamePreview;
