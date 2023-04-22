import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./InputText.module.scss";

const cx = classNames.bind(styles);

function Input({ name, title, className, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)} {...passProps}>
      <span className={cx("title")}>{title}</span>
      <input type="text" name={name} className={cx("input")}></input>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
