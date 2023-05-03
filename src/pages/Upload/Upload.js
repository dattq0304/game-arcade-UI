import classNames from "classnames/bind";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styles from "./Upload.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Upload() {
  const [isGameListLoaded, setIsGameListLoaded] = useState(false);
  const gameList = useRef([])

  const getGameList = async () => {
    try {
      const id = '643ba6009bc9f67e3bef8dc3';
      const url = `http://localhost:3001/api/game/creator/${id}`;
      const res = await axios.get(url);
      gameList.current = res.data;
      setIsGameListLoaded(true);
      console.log("getGameList - Server:", res);
    } catch (err) {
      console.error("getGameList - Client", err);
    }
  };

  useEffect(() => {
    getGameList();
  }, [])

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
        <h1 className={cx('title')}>Game uploaded dashboard</h1>
        <Button leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>} primary to="/upload/submit" target="_blank">Upload new game</Button>
      </div>
      <div className={cx("content")}>
        {gameList.current.length === 0 && (
          <h2 className={cx('subtitle')}>You don't have any game uploaded</h2>
        )}
        {gameList.current.length !== 0 && (
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Create date</th>
                <th>Modified date</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                gameList.current.map((game, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{game.name}</td>
                      <td>{fomatDate(game.create_date)}</td>
                      <td>{fomatDate(game.modified_date)}</td>
                      <td>{game.active ? 'Active' : 'Inactive'}</td>
                      <td>
                        <Link className={cx('action')} to={`/upload/edit/${game._id}`} target="_blank">
                          <FontAwesomeIcon className={cx('action-icon')} icon={faPenToSquare}></FontAwesomeIcon>
                          Edit
                        </Link>
                      </td>
                      <td>
                        <Link className={cx('action')} to={`/upload/demo/${game._id}`} target="_blank">
                          <FontAwesomeIcon className={cx('action-icon')} icon={faEye}></FontAwesomeIcon>
                          View
                        </Link>
                      </td>
                      <td>
                        <Link className={cx('action')}>
                          <FontAwesomeIcon className={cx('action-icon')} icon={faTrashCan}></FontAwesomeIcon>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>)}
      </div>
    </div>
  </div>
}

export default Upload;
