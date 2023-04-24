import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./InputSelect.module.scss";

const cx = classNames.bind(styles);

const InputSelect = ({ name, title, options, className, ...passProps }) => {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={classes} {...passProps}>
      <span className={cx("title")}>{title}</span>
      <select className={cx("select")} name={name} defaultValue="hide">
        <option value="hide" disabled hidden></option>
        {options.map((element, index) => {
          return (
            <option className={cx("option")} value={element} key={index}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
};

InputSelect.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

export default InputSelect;
