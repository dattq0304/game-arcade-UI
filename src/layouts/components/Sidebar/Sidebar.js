import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFutbolBall } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowTrendUp,
  faShuffle,
  faPeopleArrows,
  faPuzzlePiece,
  faChildDress,
  faCar,
  faHouse,
  faBicycle,
  faCubes,
  faQuestion,
  faGun,
  faJetFighterUp,
  faUpRightFromSquare,
  faDice,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";

import styles from "./Sidebar.module.scss";
import MenuItem from "~/components/MenuItem";

const cx = classNames.bind(styles);

function Sidebar(props) {
  const { classes, setIsSidebarOpen } = props;
  const [active, setActive] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const query = location.search;
    if (query.length === 0 || query === "?type=Home") {
      setActive("Home");
    } else if (query.split("=")[0] === "?type") {
      const type = query.split("=")[1];
      setActive(decodeURIComponent(type));
    } else if (query.split("=")[0] === "?category") {
      const category = query.split("=")[1];
      setActive(decodeURIComponent(category));
    } else if (query.split("=")[0] === "?search") {
      setActive("Home");
    }
  }, [location]);

  const menuType = [
    {
      leftIcon: faHouse,
      title: "Home",
      type: "Home",
    },
    {
      leftIcon: faClock,
      title: "New",
      type: "new",
    },
    {
      leftIcon: faShuffle,
      title: "Random",
      type: "random",
    },
    {
      leftIcon: faArrowTrendUp,
      title: "Popular",
      type: "popular",
    },
    {
      leftIcon: faThumbsUp,
      title: "Top rated",
      type: "topRated",
    },
  ];

  const menuCategory = [
    {
      leftIcon: faFreeCodeCamp,
      title: "Action",
    },
    {
      leftIcon: faFutbolBall,
      title: "Sport",
    },
    {
      leftIcon: faQuestion,
      title: "Quiz",
    },
    {
      leftIcon: faGun,
      title: "Gun",
    },
    {
      leftIcon: faPuzzlePiece,
      title: "Puzzle",
    },
    {
      leftIcon: faChildDress,
      title: "Beauty",
    },
    {
      leftIcon: faDice,
      title: "Gambling",
    },
    {
      leftIcon: faCar,
      title: "Car",
    },
    {
      leftIcon: faBicycle,
      title: "Bike",
    },
    {
      leftIcon: faJetFighterUp,
      title: "Jet Fighter",
    },
    {
      leftIcon: faPeopleArrows,
      title: "2 players",
    },
    {
      leftIcon: faCubes,
      title: "Minecraft",
    },
    {
      leftIcon: faUpRightFromSquare,
      title: "Other",
    },
  ];

  return (
    <aside
      className={cx("wrapper", [classes])}
      onMouseMove={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className={cx("list")}>
        {menuType.map(function (element, index) {
          return (
            <MenuItem
              className={cx("item")}
              key={index}
              leftIcon={<FontAwesomeIcon icon={element.leftIcon} />}
              onClick={() => setActive(element.title)}
              active={active === element.type}
              to={`/?type=${element.type}`}
            >
              {element.title}
            </MenuItem>
          );
        })}
        <div className={cx("spread")}></div>
        {menuCategory.map(function (element, index) {
          return (
            <MenuItem
              className={cx("item")}
              key={index}
              leftIcon={<FontAwesomeIcon icon={element.leftIcon} />}
              onClick={() => setActive(element.title)}
              active={active === element.title}
              to={`/?category=${element.title}`}
            >
              {element.title}
            </MenuItem>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
