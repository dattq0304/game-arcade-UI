import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faStar,
  faFutbolBall,
} from "@fortawesome/free-regular-svg-icons";
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
} from "@fortawesome/free-solid-svg-icons";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";

import styles from "./Sidebar.module.scss";
import MenuItem from "~/components/MenuItem";

const cx = classNames.bind(styles);

function Sidebar(props) {
  const { classes, setIsSidebarOpen } = props;

  const [active, setActive] = useState(0);

  const menuList = [
    {
      leftIcon: faHouse,
      title: "Home",
    },
    {
      leftIcon: faClock,
      title: "New",
    },
    {
      leftIcon: faShuffle,
      title: "Random",
    },
    {
      leftIcon: faArrowTrendUp,
      title: "Trending",
    },
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
        {menuList.map(function (element, index) {
          return (
            <MenuItem
              className={cx("item")}
              key={index}
              leftIcon={<FontAwesomeIcon icon={element.leftIcon} />}
              onClick={() => setActive(index)}
              active={active === index}
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
