import { useEffect, useState, useRef, Fragment } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import * as GameServices from "~/api/services/game";
import styles from "./AllGames.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function AllGames() {
  const [type, setType] = useState('all');
  const [tableKey, setTableKey] = useState(0);
  const [isGameListLoaded, setIsGameListLoaded] = useState(false);
  const gameList = useRef([]);

  useEffect(() => {
    const getALlGames = async () => {
      const res = await GameServices.getAllGames();
      gameList.current = res;
      setIsGameListLoaded(true);
    };
    getALlGames();
  }, []);

  const setGameState = async (id, active) => {
    await GameServices.setGameState(id, active);
  };

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
        <h1 className={cx('title')}>Game dashboard</h1>
      </div>
      <div className={cx('content')}>
        <div className={cx('type')}>
          <Button
            className={cx('type-btn')}
            text={type !== 'all'}
            border
            primary={type === 'all'}
            onClick={() => { setType('all') }}
          >
            All games
          </Button>
          <Button
            className={cx('type-btn')}
            text={type !== 'active'}
            border
            primary={type === 'active'}
            onClick={() => { setType('active') }}
          >
            All active games
          </Button>
          <Button
            className={cx('type-btn')}
            text={type !== 'inactive'}
            border
            primary={type === 'inactive'}
            onClick={() => { setType('inactive') }}
          >
            All inactive games
          </Button>
        </div>

        {gameList.current.length !== 0 && (
          <table className={cx('table')} key={tableKey}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Create date</th>
                <th>Modified date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                gameList.current.filter(game => type === 'all' || (game.active === true && type === 'active') || (game.active === false && type === 'inactive')).map((game, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{game.name}</td>
                      <td>{fomatDate(game.create_date)}</td>
                      <td>{fomatDate(game.modified_date)}</td>
                      <td>{game.active ? 'Active' : 'Inactive'}</td>
                      {game.active && <td>
                        <div
                          className={cx('action')}
                          onClick={() => {
                            game.active = false;
                            setGameState(game._id, false);
                            setTableKey(tableKey + 1);
                          }}>
                          <FontAwesomeIcon className={cx('action-icon')} icon={faLock}></FontAwesomeIcon>
                          To inactive
                        </div>
                      </td>}
                      {!game.active && <td>
                        <div
                          className={cx('action')}
                          onClick={() => {
                            game.active = true;
                            setGameState(game._id, true);
                            setTableKey(tableKey + 1);
                          }}>
                          <FontAwesomeIcon className={cx('action-icon')} icon={faLockOpen}></FontAwesomeIcon>
                          To active
                        </div>
                      </td>}
                      <td>
                        <Link className={cx('action')} to={`/upload/demo/${game._id}`} target="_blank">
                          <FontAwesomeIcon className={cx('action-icon')} icon={faEye}></FontAwesomeIcon>
                          View
                        </Link>
                      </td>
                      <td>
                        <div
                          className={cx('action')}
                          onClick={() => {
                            GameServices.deleteGame(game._id);
                            gameList.current.splice(index, 1);
                            setTableKey(tableKey + 1);
                          }}
                        >
                          <FontAwesomeIcon className={cx('action-icon')} icon={faTrashCan}></FontAwesomeIcon>
                          Delete
                        </div>
                      </td>
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

export default AllGames;