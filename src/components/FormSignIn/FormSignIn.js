import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./FormSignIn.module.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const cx = classNames.bind(styles);

function FormSignIn({ handleClickSignIn }) {
  const [currentAction, setCurrentAction] = useState("signIn");

  const handleClickInner = (event) => {
    event.stopPropagation();
  };

  const setActionToSignUp = () => {
    setCurrentAction("signUp");
  };

  const setActionToSignIn = () => {
    setCurrentAction("signIn");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("overlay")} onClick={handleClickSignIn}>
        <div className={cx("inner")} onClick={handleClickInner}>
          {currentAction === "signIn" && (
            <SignIn
              handleClickCloseBtn={handleClickSignIn}
              setActionToSignUp={setActionToSignUp}
            ></SignIn>
          )}
          {currentAction === "signUp" && (
            <SignUp
              handleClickCloseBtn={handleClickSignIn}
              setActionToSignIn={setActionToSignIn}
            ></SignUp>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormSignIn;
