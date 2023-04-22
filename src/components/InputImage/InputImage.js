import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import styles from "./InputImage.module.scss";

const cx = classNames.bind(styles);

function Input({ name, title, image, className, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={cx(classes)} {...passProps}>
      <span className={cx("title")}>Cover Image</span>
      <div className={cx("image-wrapper")}>
        <div className={cx("preview")}>
          <input
            name={name}
            type="file"
            accept=".jpg, .jpeg, .png"
            className={cx("input")}
          ></input>
          {image ? (
            <img src={image} className={cx("preview-image")} alt="Preview" />
          ) : (
            <FontAwesomeIcon
              icon={faCameraRetro}
              className={cx("image-icon")}
            ></FontAwesomeIcon>
          )}
        </div>
        <p className={cx("note")}>
          Upload a cover image of your game. This can be a stylized image
          containing your game art and title. A cover should at least be 712
          pixels wide and 400 pixels high. The cover should not include any
          "Play" or "Start" button or any mobile app icons.
        </p>
      </div>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
