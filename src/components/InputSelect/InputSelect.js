import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./InputSelect.module.scss";

const cx = classNames.bind(styles);

function Input({ name, title, options, className, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={classes} {...passProps}>
      <span className={cx("title")}>{title}</span>
      <select className={cx("input")} name={name} defaultValue="hide">
        <option value="hide" disabled hidden></option>
        {options.map((element, index) => {
          return (
            <option value={element} key={index}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

export default Input;
