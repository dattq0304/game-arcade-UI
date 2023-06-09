import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";
import Footer from "~/layouts/components/Footer";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar
          classes={`${isSidebarOpen ? "wide" : ""}`}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className={cx("content")}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
