import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";
import config from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";

import styles from "./Header.module.scss";
import logo from "~/assets/images/logo192.png";
import Button from "~/components/Button/Button";
import Search from "../Search";
import FormSignIn from "~/components/FormSignIn";
import Profile from "~/components/Profile";

const cx = classNames.bind(styles);

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClickSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={config.routes.home} className={cx("logo-link")}>
          <img src={logo} alt="Game Arcade" />
          <span>
            Game
            <br />
            Arcade
          </span>
        </Link>

        <Search />

        <div className={cx("actions")}>
          <Button leftIcon={<FontAwesomeIcon icon={faHeart} />} text>
            My games
          </Button>
          <Profile></Profile>
          {/* <Button
            leftIcon={<FontAwesomeIcon icon={faUser} />}
            primary
            onClick={handleClickSignIn}
          >
            Sign in
          </Button> */}
          {showSignIn && (
            <FormSignIn handleClickSignIn={handleClickSignIn}></FormSignIn>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
