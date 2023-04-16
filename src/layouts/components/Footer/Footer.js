import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./Footer.module.scss";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("media")}>
          <Button rounded border svg href="https://tiktok.com" target="blank">
            <FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon>
          </Button>
          <Button
            rounded
            border
            svg
            href="https://www.facebook.com/profile.php?id=100017638901526"
            target="blank"
          >
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </Button>
          <Button
            rounded
            border
            svg
            href="https://www.instagram.com/tqd_0304"
            target="blank"
          >
            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
          </Button>
          <Button rounded border svg href="https://youtube.com" target="blank">
            <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
          </Button>
          <Button rounded border svg href="https://twitter.com" target="blank">
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </Button>
          <Button rounded border svg href="https://linkedin.com" target="blank">
            <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
          </Button>
        </div>
        <div className={cx("contact")}>
          <a
            href="http://localhost:3000/"
            target="blank"
            className={cx("contact-item")}
          >
            About
          </a>
          <a
            href="http://localhost:3000/"
            target="blank"
            className={cx("contact-item")}
          >
            Contact
          </a>
          <a
            href="http://localhost:3000/"
            target="blank"
            className={cx("contact-item")}
          >
            Privacy
          </a>
          <a
            href="http://localhost:3000/"
            target="blank"
            className={cx("contact-item")}
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
