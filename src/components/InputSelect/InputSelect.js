import classNames from "classnames/bind";

import styles from "./InputSelect.module.scss";

const cx = classNames.bind(styles);

function InputSelect({ name, title, options, className, value = "hide", onChange, ...passProps }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={classes} {...passProps}>
      <span className={cx("title")}>{title}</span>
      <select className={cx("select")} name={name} value={value} onChange={onChange}>
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

export default InputSelect;
