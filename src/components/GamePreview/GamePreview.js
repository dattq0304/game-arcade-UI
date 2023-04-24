import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./GamePreview.module.scss";

const cx = classNames.bind(styles);

function GamePreview({
  to,
  previewImage,
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
        ></div>
      </Link>
    </div>
  );
}

GamePreview.prototype = {
  to: PropTypes.string,
  previewImage: PropTypes.string,
  className: PropTypes.string,
  hot: PropTypes.bool,
  recent: PropTypes.bool,
  toprated: PropTypes.bool,
};

export default GamePreview;
