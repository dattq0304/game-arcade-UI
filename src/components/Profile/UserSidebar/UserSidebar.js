import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { useCookies } from 'react-cookie';
import styles from "./UserSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserPen, faUpload, faArrowRightFromBracket, faUsers, faGamepad } from "@fortawesome/free-solid-svg-icons";

import MenuItem from "~/components/MenuItem";
import { UserContext } from "~/store/userContext";
import AccountSetting from "../AccountSetting";

const cx = classNames.bind(styles);

function UserSidebar({ toggleUserSidebar }) {
  const [showAccountSetting, setShowAccountSetting] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const user = useContext(UserContext);

  const handleClickInner = (event) => {
    event.stopPropagation();
  };

  const toggleAccountSetting = () => {
    setShowAccountSetting(!showAccountSetting);
  }

  const handleLogout = (event) => {
    removeCookie('token', { path: '/' });
    window.location.reload();
  };

  return <div className={cx('overlay')}>
    <div className={cx('container')} onClick={handleClickInner}>
      {showAccountSetting && <AccountSetting
        toggleUserSidebar={toggleUserSidebar}
        toggleAccountSetting={toggleAccountSetting}
      ></AccountSetting>}

      {!showAccountSetting && <div className={cx('inner')}>
        <div className={cx('header')}>
          <img className={cx('background-image')} src="https://images.crazygames.com/userportal/covers/Space.jpg">
          </img>
          <div className={cx('close-btn')} onClick={toggleUserSidebar}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </div>
          <img className={cx('avatar')} src="https://images.crazygames.com/userportal/avatars/9.png"></img>
          <div className={cx('username')}>{user.username}</div>
          <div className={cx('email')}>{user.email}</div>
        </div>
        <div className={cx('item-list')}>
          <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faUserPen} />}
            small
            onClick={toggleAccountSetting}
          >
            Account setting
          </MenuItem>
          <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faUpload} />}
            small
            to="/upload"
          >
            Game upload
          </MenuItem>
          {user.role === 'admin' && <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faUsers} />}
            small
            to="/admin/users"
          >
            Users manage
          </MenuItem>
          }
          {user.role === 'admin' && <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faGamepad} />}
            small
            to="/admin/games"
          >
            Games manage
          </MenuItem>
          }
          <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            small
            onClick={handleLogout}
          >
            Log out
          </MenuItem>
        </div>
      </div>}
    </div>
  </div>
}

export default UserSidebar;
