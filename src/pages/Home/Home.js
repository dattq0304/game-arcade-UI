import classNames from "classnames/bind";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import GameRow from "~/components/GameRow";
import GamePreview from "~/components/GamePreview";
import * as GameServices from "~/api/services/game"

const cx = classNames.bind(styles);

function Home() {
  const location = useLocation();
  const [home, setHome] = useState(true);
  const [gameList, setGameList] = useState([]);
  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image/`;

  useEffect(() => {
    const getGameByType = (type) => {
      GameServices.getGameByType(type, 100)
        .then(res => {
          setGameList(res);
          console.log(res);
        })
        .catch(err => console.error(err));
    };

    const getGameByCategory = (category) => {
      GameServices.getGameByCategory(category, 100)
        .then(res => {
          setGameList(res);
          console.log(res);
        })
        .catch(err => console.error(err));
    };

    const getGameByName = (name) => {
      console.log(name);
      GameServices.getGameByName(name, 100)
        .then(res => {
          setGameList(res);
          console.log(res);
        })
        .catch(err => console.error(err));
    }

    const query = location.search;
    if (query.length === 0 || query === "?type=Home") {
      setHome(true);
    } else if (query.split('=')[0] === "?type") {
      const type = query.split("=")[1];
      getGameByType(type);
      setHome(false);
    } else if (query.split('=')[0] === "?category") {
      const category = query.split("=")[1];
      getGameByCategory(category);
      setHome(false);
    } else if (query.split('=')[0] === "?search") {
      const name = query.split("=")[1];
      console.log("search =", name);
      getGameByName(name);
      setHome(false);
    }
  }, [location]);

  return (
    <div className={cx("wrapper")}>
      {home && <div className={cx("home")}>
        <GameRow title="New game" type="new"></GameRow>
        <GameRow title="Random" type="random"></GameRow>
        <GameRow title="Action" category="Action"></GameRow>
        <GameRow title="Sport" category="Sport"></GameRow>
        <GameRow title="Quiz" category="Quiz"></GameRow>
        <GameRow title="Gun" category="Gun"></GameRow>
        <GameRow title="Puzzle" category="Puzzle"></GameRow>
        <GameRow title="Beauty" category="Beauty"></GameRow>
        <GameRow title="Gambling" category="Gambling"></GameRow>
        <GameRow title="Car" category="Car"></GameRow>
        <GameRow title="Bike" category="Bike"></GameRow>
        <GameRow title="Jet Fighter" category="Jet Fighter"></GameRow>
        <GameRow title="2 players" category="2 players"></GameRow>
        <GameRow title="Minecraft" category="Minecraft"></GameRow>
        <GameRow title="Other" category="Other"></GameRow>
      </div>}
      {!home && <div className={cx('other')}>
        {gameList.map((game, index) => {
          return (
            <div key={index} className={cx("content-item")}>
              <GamePreview
                previewImage={coverImageUrl + game._id}
                name={game.name}
                to={`/game/${game._id}`}
              ></GamePreview>
            </div>
          );
        })}
        {
          gameList.length === 0 &&
          <div className={cx("message")}>Not available</div>
        }
      </div>}
    </div>
  );
};

export default Home;
