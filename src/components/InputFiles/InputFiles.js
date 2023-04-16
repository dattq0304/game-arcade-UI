import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./InputFiles.module.scss";

const cx = classNames.bind(styles);

function Input({ title, className, description, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)} {...passProps}>
      <span className={cx("title")}>Files Upload</span>
      <div className={cx("drag-file-area")}>
        <input
          type="file"
          name="myfile"
          multiple
          className={cx("input")}
        ></input>
        <h3 class={cx("dynamic-message")}> {description} </h3>
      </div>
    </div>
  );
}

Input.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
