import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef } from "react";

import styles from "./InputFolder.module.scss";

const cx = classNames.bind(styles);

function Input({
  name,
  title,
  className,
  filesUploaded,
  setFilesUploaded,
  ...passProps
}) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  const inputRef = useRef(null);

  const handleDeleteAllFiles = (event) => {
    event.preventDefault();
    inputRef.current.value = null;
    setFilesUploaded([]);
  };

  const handleFolderUpload = (event) => {
    const fileList = inputRef.current.files;
    const fileListItems = [];
    for (const file of fileList) {
      fileListItems.push(file);
    }
    setFilesUploaded(fileListItems);
  };

  return (
    <div className={cx(classes)} {...passProps}>
      <span className={cx("title")}>
        {title}{" "}
        {filesUploaded.length > 0 && (
          <button
            className={cx("delete-all-btn")}
            onClick={handleDeleteAllFiles}
          >
            Delete all files
          </button>
        )}
      </span>
      <div className={cx("drag-file-area")}>
        <input
          ref={inputRef}
          type="file"
          name={name}
          webkitdirectory=""
          directory=""
          multiple=""
          className={cx("input")}
          onChange={handleFolderUpload}
        ></input>
        {filesUploaded.length === 0 && (
          <h3 className={cx("dynamic-message")}>
            {" "}
            Upload all game files. Make sure you have "index.html" as entry
            point for your game. You can drag & drop folders here.{" "}
          </h3>
        )}
        {filesUploaded.length > 0 && (
          <div className={cx("file-list__wrapper")}>
            <ul className={cx("file-list")}>
              {filesUploaded.map((file, index) => {
                return <li key={index}>{file.webkitRelativePath}</li>;
              })}
            </ul>
          </div>
        )}
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
