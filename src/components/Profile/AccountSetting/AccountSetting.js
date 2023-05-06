import classNames from "classnames/bind";
import { Fragment, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./AccountSetting.module.scss";
import InputText from "~/components/InputText";
import { UserContext } from "~/store/userContext";
import Button from "~/components/Button";
import * as UserServices from "~/api/services/user"

const cx = classNames.bind(styles);

function AccountSetting({ toggleUserSidebar, toggleAccountSetting }) {
  const user = useContext(UserContext);

  const [showUsernameInput, setUsernameInput] = useState(false);
  const [showEmailInput, setEmailInput] = useState(false);
  const [showPasswordInput, setPasswordInput] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const editUsername = () => {
    setUsernameInput(!showUsernameInput);
  };

  const editEmail = () => {
    setEmailInput(!showEmailInput);
  };

  const editPassword = () => {
    setPasswordInput(!showPasswordInput);
  };

  const submitUsername = async () => {
    const res = await UserServices.updateUsername(user._id, username);
    alert(res.message);
    if (res.ok) {
      user.username = username;
      setUsernameInput(!showUsernameInput);
    }
  };

  const submitEmail = async () => {
    const res = await UserServices.updateEmail(user._id, email);
    alert(res.message);
    if (res.ok) {
      user.email = email;
      setEmailInput(!showEmailInput);
    }
  };

  const submitPassword = async () => {
    const res = await UserServices.updatePassword(user._id, password, newPassword);
    alert(res.message);
    if (res.ok) {
      setPasswordInput(!showPasswordInput);
    }
  };

  return <div className={cx('inner')}>
    <div className={cx('header')}>
      <img className={cx('background-image')} src="https://images.crazygames.com/userportal/covers/Space.jpg">
      </img>
      <div className={cx('close-btn')} onClick={toggleUserSidebar}>
        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
      </div>
      <div className={cx('prev-btn')} onClick={toggleAccountSetting}>
        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
      </div>
      <img className={cx('avatar')} src="https://images.crazygames.com/userportal/avatars/9.png"></img>
    </div>
    <div className={cx('item-list')}>
      <Button
        className={cx('item')}
        text
        border
        onClick={editUsername}
      >Edit username</Button>
      {showUsernameInput &&
        <Fragment>
          <InputText
            className={cx('item')}
            title="New username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          >
          </InputText>
          <Button
            className={cx('item')}
            primary
            onClick={submitUsername}
          >Submit</Button>
        </Fragment>
      }
      <Button
        className={cx('item')}
        text
        border
        onClick={editEmail}
      >Edit email</Button>
      {showEmailInput &&
        <Fragment>
          <InputText
            className={cx('item')}
            title="New email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          >
          </InputText>
          <Button
            className={cx('item')}
            primary
            onClick={submitEmail}
          >Submit</Button>
        </Fragment>
      }
      <Button
        className={cx('item')}
        text
        border
        onClick={editPassword}
      >Edit password</Button>
      {showPasswordInput &&
        <Fragment>
          <InputText
            className={cx('item')}
            title="Current password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          >
          </InputText>
          <InputText
            className={cx('item')}
            title="New password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value) }}
          >
          </InputText>
          {/* <InputText
            className={cx('item')}
            title="Confirm new password"
          >
          </InputText> */}
          <Button
            className={cx('item')}
            primary
            onClick={submitPassword}
          >Submit</Button>
        </Fragment>
      }

      {/* <InputText
        className={cx('item')}
        title="Edit username"
        value={user.username}
      >
      </InputText>
      <InputText
        className={cx('item')}
        title="Edit email"
        value={user.email}
      >
      </InputText> */}
    </div>
  </div>;
}

export default AccountSetting;
