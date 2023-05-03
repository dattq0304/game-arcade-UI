import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./UserSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserPen, faUpload, faArrowRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";

import MenuItem from "~/components/MenuItem";

const cx = classNames.bind(styles);

function UserSidebar({ role = 'user', toggleUserSidebar }) {
  const handleClickInner = (event) => {
    event.stopPropagation();
  };

  return <div className={cx('overlay')}>
    <div className={cx('container')} onClick={handleClickInner}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <img className={cx('background-image')} src="https://images.crazygames.com/userportal/covers/Space.jpg">
          </img>
          <div className={cx('close-btn')} onClick={toggleUserSidebar}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </div>
          <img className={cx('avatar')} src="https://images.crazygames.com/userportal/avatars/9.png"></img>
          <div className={cx('username')}>dattq0304</div>
          <div className={cx('email')}>dattq0304@gmail.com</div>
        </div>
        <div className={cx('item-list')}>
          <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faUserPen} />}
            small
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
          {role === 'admin' && <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faUsers} />}
            small
          >
            Users dashboard
          </MenuItem>}
          <MenuItem
            className={cx('item')}
            leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            small
          >
            Log out
          </MenuItem>
        </div>
      </div>
    </div>
  </div>
}

export default UserSidebar;
