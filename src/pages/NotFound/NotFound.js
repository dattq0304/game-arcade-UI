import classNames from "classnames/bind";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  return <div className={cx('wrapper')}>
    <h1 className={cx('title')}>Page not found!</h1>
  </div>
}

export default NotFound;
