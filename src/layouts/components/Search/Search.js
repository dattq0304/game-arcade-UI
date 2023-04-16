import classNames from "classnames/bind";
import config from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.scss";
const cx = classNames.bind(styles);

function Search() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <input
          type="text"
          className={cx("search-input")}
          placeholder="Search"
        />
        <div className={cx("search-btn")}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

export default Search;
