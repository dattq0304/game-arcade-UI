import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./InputText.module.scss";

const cx = classNames.bind(styles);

function Input({ title, className, type = "text", ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)} {...passProps}>
      <span className={cx("title")}>{title}</span>
      <input type={type} className={cx("input")}></input>
    </div>
  );
}

Input.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
