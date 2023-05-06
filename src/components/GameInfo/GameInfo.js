import classNames from "classnames/bind";

import styles from "./GameInfo.module.scss";

const cx = classNames.bind(styles);

function GameInfo({ name, control, description, className, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)}>
      <h1 className={cx("game-name")}>{name}</h1>
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
