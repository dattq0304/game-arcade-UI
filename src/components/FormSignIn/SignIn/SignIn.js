import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import styles from "./SignIn.module.scss";
import InputText from "~/components/InputText";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function SignIn({ handleClickCloseBtn, setActionToSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['token']);

  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log("Sign In With:", username, password);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const urlencoded = new URLSearchParams(formData).toString();
      const res = await axios.post(
        `http://localhost:3001/api/user/login`,
        urlencoded,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setCookie('token', res.data.token, { path: '/' });

      console.log("handleSignIn - Server:", res);
      window.location.reload();
    } catch (err) {
      alert("Username or password incorrect!");
      console.error("handleSignUp - Client", err);
    }
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
