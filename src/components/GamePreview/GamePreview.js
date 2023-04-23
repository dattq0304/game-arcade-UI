import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./GamePreview.module.scss";

const cx = classNames.bind(styles);

function GamePreview({
  to,
  previewImage,
  className,
  small = true,
  medium = false,
  large = false,
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
    small,
    medium,
    large,
    hot,
    recent,
    toprated,
  });

  return (
    <div className={classes} {...props}>
      <Link to={to}>
        <label className={cx("status")}></label>
        {/* <img className={cx("game-image")} src={previewImage} alt=""></img> */}
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
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  hot: PropTypes.bool,
  recent: PropTypes.bool,
  toprated: PropTypes.bool,
};

export default GamePreview;
