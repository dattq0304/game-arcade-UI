import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./SignIn.module.scss";
import InputText from "~/components/InputText";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function SignIn({ handleClickCloseBtn, setActionToSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("Sign In With:", username, password);
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
            title="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></InputText>
          <InputText
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
