import classNames from "classnames/bind";

import styles from "./About.module.scss";

const cx = classNames.bind(styles);

function About() {
  return <div className={cx("wrapper")}>
    <div className={cx("inner")}>
      <h2 className={cx("title")}>About us</h2>
      <div className={cx("content")}>
        <p>
          Welcome to our online gaming website! We are dedicated to providing you with a thrilling and immersive gaming experience. Whether you're a casual gamer or a hardcore enthusiast, we have something exciting for everyone.
        </p>
        <p>
          At our platform, we offer a wide range of online games that cater to various interests and preferences. From action-packed adventures to mind-bending puzzles and strategic simulations, we have carefully curated a diverse collection to keep you entertained and engaged.
        </p>
        <p>
          Our team is passionate about gaming and understands the importance of creating a user-friendly and enjoyable environment. We strive to deliver seamless gameplay, stunning graphics, and captivating storytelling to enhance your gaming sessions.
        </p>
        <p>
          Join our vibrant community of gamers from around the world and connect with like-minded individuals who share your passion for gaming. Engage in friendly competition, form alliances, and make new friends as you embark on epic virtual journeys together.
        </p>
        <p>
          We value your feedback and continuously work on improving our platform to provide you with the best possible gaming experience. Our dedicated support team is available to assist you with any queries or technical issues you may encounter.
        </p>
        <p>
          So, dive into the world of online gaming with us and unleash your inner adventurer, strategist, or problem solver. Get ready to experience the thrill, excitement, and camaraderie that only online gaming can offer. Let the games begin!
        </p>
      </div>
    </div>
  </div >
}

export default About;