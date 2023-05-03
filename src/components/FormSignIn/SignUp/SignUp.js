import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./SignUp.module.scss";
import InputText from "~/components/InputText";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function SignUp({ handleClickCloseBtn, setActionToSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Sign Up With:", username, password);
  };

  return (
    <div className={cx("inner")}>
      <div className={cx("heading")}>
        <span className={cx("title")}>Sign Up</span>
        <div className={cx("close-btn")} onClick={handleClickCloseBtn}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </div>
      </div>
      <form onSubmit={handleSignUp} id="sign-in">
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
            name="email"
            title="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></InputText>
          <InputText
            className={cx('input-field')}
            name="password"
            title="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></InputText>
          <InputText
            className={cx('input-field')}
            title="Confirm Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></InputText>
          <div className={cx("btn-wrapper")}>
            <Button className={cx("signup-btn")} type="submit" primary>
              Create an account
            </Button>
            <span className={cx("btn-seperate")}>Or</span>
            <Button
              className={cx("submit-btn")}
              text
              border
              onClick={setActionToSignIn}
            >
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
