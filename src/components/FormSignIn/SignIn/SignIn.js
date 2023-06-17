import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./SignIn.module.scss";
import InputText from "~/components/InputText";
import Button from "~/components/Button";
import * as UserServices from "~/api/services/user";

const cx = classNames.bind(styles);

function SignIn({ handleClickCloseBtn, setActionToSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['token']);

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      alert("Please enter an username!");
      return;
    }

    if (password.trim() === "") {
      alert("Please enter a password!");
      return;
    }

    const res = await UserServices.signIn({ username: username, password: password });
    setCookie('token', res.token, { path: '/' });
    window.location.reload();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <span className={cx("title")}>Sign In</span>
        <div className={cx("close-btn")} onClick={handleClickCloseBtn}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </div>
      </div>
      <form onSubmit={handleSignIn} id="sign-in">
        <div className={cx("content")}>
          <InputText
            className={cx('input-field')}
            name="username"
            title="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></InputText>
          <InputText
            className={cx('input-field')}
            name="password"
            title="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></InputText>
          <div className={cx("btn-wrapper")}>
            <Button className={cx("submit-btn")} type="submit" primary>
              Sign in
            </Button>
            <span className={cx("btn-seperate")}>Or</span>
            <Button
              className={cx("signup-btn")}
              text
              border
              onClick={setActionToSignUp}
            >
              Create an account
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
