import Header from "~/layouts/components/Header";
import classNames from "classnames/bind";

import styles from "./NoSidebar.module.scss";
import Footer from "../components/Footer/Footer";

const cx = classNames.bind(styles);

function NoSidebar({ children }) {
  return (
    <div>
      <Header />
      <div className={cx("wrapper")}>
        <div className={cx("container")}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default NoSidebar;
