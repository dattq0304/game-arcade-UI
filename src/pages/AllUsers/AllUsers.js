import { useEffect, useState, useRef, Fragment } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import * as UserService from "~/api/services/user";
import styles from "./AllUsers.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function AllUsers() {
  const [type, setType] = useState('all');
  const [tableKey, setTableKey] = useState(0);
  const [isUserListLoaded, setIsUserListLoaded] = useState(false);
  const userList = useRef([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await UserService.getAllUsers();
      userList.current = res;
      setIsUserListLoaded(true);
    };
    getAllUsers();
  }, []);

  const fomatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  return <div className={cx('wrapper')}>
    <div className={cx('inner')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>User dashboard</h1>
      </div>
      <div className={cx('content')}>
        {userList.current.length !== 0 && (
          <table className={cx('table')} key={tableKey}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined date</th>
                <th>Role</th>
                {/* <th>Uploaded games</th> */}
              </tr>
            </thead>
            <tbody>
              {
                userList.current.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{fomatDate(user.create_date)}</td>
                      <td>{user.role}</td>
                      {/* <td>
                        <Link className={cx('action')} to="upload/game" target="_blank">
                          <FontAwesomeIcon className={cx('action-icon')} icon={faEye}></FontAwesomeIcon>
                          View
                        </Link>
                      </td> */}
                      {user.role === 'user' && <td>
                        <Link className={cx('action')}>
                          <FontAwesomeIcon className={cx('action-icon')} icon={faTrashCan}></FontAwesomeIcon>
                          Delete
                        </Link>
                      </td>}
                    </tr>
                  );
                })
              }
            </tbody>
          </table>)}
      </div>
    </div>
  </div >
};

export default AllUsers;