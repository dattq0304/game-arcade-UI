import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import styles from "./InputImage.module.scss";

const cx = classNames.bind(styles);

function Input({ title, description, image, className, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)} {...passProps}>
      <span className={cx("title")}>Cover Image</span>
      <div className={cx("image-wrapper")}>
        <div className={cx("preview")}>
          <input type="file" className={cx("input")}></input>
          {image ? (
            <img src={image} className={cx("preview-image")} alt="Preview" />
          ) : (
            <FontAwesomeIcon
              icon={faCameraRetro}
              className={cx("image-icon")}
            ></FontAwesomeIcon>
          )}
        </div>
        <p className={cx("note")}>{description}</p>
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
