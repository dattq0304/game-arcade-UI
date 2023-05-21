import { useState, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import UserSidebar from "./UserSidebar";
import { UserContext } from "~/store/userContext";

const cx = classNames.bind(styles);

function Profile() {
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const user = useContext(UserContext);

  const toggleUserSidebar = () => {
    setShowUserSidebar(!showUserSidebar);
  }

  return <div className={cx('wrapper')} onClick={toggleUserSidebar}>
    <img className={cx('avatar')} src={user.profile_image}></img>
    {showUserSidebar && <UserSidebar toggleUserSidebar={toggleUserSidebar}></UserSidebar>}
  </div>
}

export default Profile;
