import classnames from "classnames/bind";
import { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import ProgressBar from 'react-bootstrap/ProgressBar';

import { UserContext } from "~/store/userContext";
import styles from "./Review.module.scss";
import * as ReviewService from "~/api/services/review";
import OldReview from "./OldReview/OldReview";
import GameReviewAction from "../GameReviewAction/GameReviewAction";

const cx = classnames.bind(styles);

function Review({ gameId }) {
  const [isLoading, setIsLoading] = useState(null);
  const reviews = useRef([]);
  const totalStars = useRef({
    star1: 0,
    star2: 0,
    star3: 0,
    star4: 0,
    star5: 0,
  });
  const user = useContext(UserContext);
  const [showGameReviewAction, setShowGameReviewAction] = useState(false);

  const toogleGameReviewAction = () => {
    setShowGameReviewAction(!showGameReviewAction);
  }

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      const res = await ReviewService.getReviews({ gameId: gameId });
      reviews.current = res;
      totalStars.current = {
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
      };
      res.forEach(review => {
        if (review.star === 1) {
          totalStars.current.star1++;
        }
        else if (review.star === 2) {
          totalStars.current.star2++;
        }
        else if (review.star === 3) {
          totalStars.current.star3++;
        }
        else if (review.star === 4) {
          totalStars.current.star4++;
        }
        else {
          totalStars.current.star5++;
        }
      })
      console.log(reviews.current);
      setIsLoading(false);
    };
    getReviews();
  }, []);

  const addReview = async (review, type) => {
    if (type === "update") {
      const index = reviews.current.indexOf(review);
      reviews.current.splice(index, 1);
      if (review.star === 1) {
        totalStars.current.star1--;
      }
      else if (review.star === 2) {
        totalStars.current.star2--;
      }
      else if (review.star === 3) {
        totalStars.current.star3--;
      }
      else if (review.star === 4) {
        totalStars.current.star4--;
      }
      else {
        totalStars.current.star5--;
      }
      reviews.current.length--;
    }
    if (review.star === 1) {
      totalStars.current.star1++;
    }
    else if (review.star === 2) {
      totalStars.current.star2++;
    }
    else if (review.star === 3) {
      totalStars.current.star3++;
    }
    else if (review.star === 4) {
      totalStars.current.star4++;
    }
    else {
      totalStars.current.star5++;
    }
    reviews.current.push(review);
  }

  const handleDeleteReview = async (id) => {
    const res = await ReviewService.deleteReview({ gameId: gameId });
    const index = reviews.current.indexOf(res);
    reviews.current.splice(index, 1);
    if (res.star === 1) {
      totalStars.current.star1--;
    }
    else if (res.star === 2) {
      totalStars.current.star2--;
    }
    else if (res.star === 3) {
      totalStars.current.star3--;
    }
    else if (res.star === 4) {
      totalStars.current.star4--;
    }
    else {
      totalStars.current.star5--;
    }
    reviews.current.length--;
  };

  return <div className={cx("wrapper")}>
    {showGameReviewAction &&
      <GameReviewAction
        toogleGameReviewAction={toogleGameReviewAction}
        gameId={gameId}
        addReview={addReview}
      />
    }
    {reviews.current && <h3 className={cx("rating-title")}>
      Ratings and reviews
      <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faArrowRight} />
    </h3>}
    <div className={cx("rating-table")}>
      <div className={cx("rating-table-left")}>
        <div className={cx("rating-table-point")}>
          {reviews.current.length === 0 ? 0 : ((totalStars.current.star1 + totalStars.current.star2 * 2
            + totalStars.current.star3 * 3 + totalStars.current.star4 * 4
            + totalStars.current.star5 * 5) / reviews.current.length).toFixed(1)
          }
        </div>
        <div className={cx("rating-table-stars")}>
          <div className={cx("stars")} style={{
            "--rating": `${reviews.current.length === 0 ? 0 : (totalStars.current.star1 + totalStars.current.star2 * 2
              + totalStars.current.star3 * 3 + totalStars.current.star4 * 4
              + totalStars.current.star5 * 5) / reviews.current.length}`
          }} aria-label="Rating of this product is 2.3 out of 5." />
        </div>
        <div className={cx("rating-table-total")}>{reviews.current.length} reviews</div>
      </div>
      <div className={cx("rating-table-right")}>
        <div className={cx("rating-table-row")}>
          5
          <div className={cx("rating-table-progress-bar")} >
            <div className={cx("rating-table-progess-bar-content")}
              style={{ width: `${reviews.current.length === 0 ? 0 : 100 * totalStars.current.star5 / reviews.current.length}%` }} />
          </div>
        </div>
        <div className={cx("rating-table-row")}>
          4
          <div className={cx("rating-table-progress-bar")} >
            <div className={cx("rating-table-progess-bar-content")}
              style={{ width: `${reviews.current.length === 0 ? 0 : 100 * totalStars.current.star4 / reviews.current.length}%` }} />
          </div>
        </div>
        <div className={cx("rating-table-row")}>
          3
          <div className={cx("rating-table-progress-bar")} >
            <div className={cx("rating-table-progess-bar-content")}
              style={{ width: `${reviews.current.length === 0 ? 0 : 100 * totalStars.current.star3 / reviews.current.length}%` }} />
          </div>
        </div>
        <div className={cx("rating-table-row")}>
          2
          <div className={cx("rating-table-progress-bar")} >
            <div className={cx("rating-table-progess-bar-content")}
              style={{ width: `${reviews.current.length === 0 ? 0 : 100 * totalStars.current.star2 / reviews.current.length}%` }} />
          </div>
        </div>
        <div className={cx("rating-table-row")}>
          1
          <div className={cx("rating-table-progress-bar")} >
            <div className={cx("rating-table-progess-bar-content")}
              style={{ width: `${reviews.current.length === 0 ? 0 : 100 * totalStars.current.star1 / reviews.current.length}%` }} />
          </div>
        </div>
      </div>
    </div>
    {user ? <div className={cx("rating-action")} onClick={toogleGameReviewAction}>
      Rate this game
    </div> : <div>Login to rate this game</div>}
    <div className={cx("old-review-wrapper")} >
      {reviews.current.map((review, index) => {
        return <OldReview review={review} key={index} handleDeleteReview={handleDeleteReview} />
      })
      }
    </div>
  </div>
}

export default Review;