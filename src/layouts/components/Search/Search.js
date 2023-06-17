import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${inputValue}`);
  };

  useEffect(() => {
    const query = location.search;
    if (query.split('=')[0] === "?search") {
      setInputValue(decodeURIComponent(query.split('=')[1]));
    }
    else {
      setInputValue('');
    }
  }, [location]);

  return (
    <div className={cx("wrapper")}>
      <form onSubmit={handleSubmit} className={cx("inner")}>
        <input
          type="text"
          className={cx("search-input")}
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={cx("search-btn")}>
          <FontAwesomeIcon icon={faSearch} onClick={handleSubmit}></FontAwesomeIcon>
        </div>
      </form>
    </div>
  );
}

export default Search;
