import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import UserSidebar from "./UserSidebar";

const cx = classNames.bind(styles);

function Profile() {
  const [showUserSidebar, setShowUserSidebar] = useState(false);

  const toggleUserSidebar = () => {
    setShowUserSidebar(!showUserSidebar);
  }

  return <div className={cx('wrapper')} onClick={toggleUserSidebar}>
    <img className={cx('avatar')} src="https://images.crazygames.com/userportal/avatars/9.png"></img>
    {showUserSidebar && <UserSidebar toggleUserSidebar={toggleUserSidebar}></UserSidebar>}
  </div>
}

export default Profile;
