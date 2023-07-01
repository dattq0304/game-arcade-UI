import classnames from "classnames/bind";
import { useState, useEffect, useContext, useRef } from "react";

import { UserContext } from "~/store/userContext";
import styles from "./OldReview.module.scss";
import * as UserService from "~/api/services/user";

const cx = classnames.bind(styles);

function OldReview({ review, handleDeleteReview }) {
  const [isLoading, setIsLoading] = useState(null);
  const commentUsers = useRef();
  const user = useContext(UserContext);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const res = await UserService.getUser(review.user_id);
      commentUsers.current = res;
      setIsLoading(false);
    }
    getUser();
  }, []);

  const convertDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return <div className={cx("wrapper")} ref={wrapperRef}>
    {commentUsers.current && <div className={cx("old-comment")} >
      <div className={cx("old-comment__profile")}>
        <img src={commentUsers.current.profile_image} alt="avatar" />
        <div className={cx("stars")} style={{ "--rating": review.star }} aria-label="Rating of this product is 2.3 out of 5." />
      </div>
      <div className={cx("old-comment__main")}>
        <div className={cx("old-comment__header")}>
          <strong>{commentUsers.current.username}</strong>
          <div className={cx("old-comment__date")}>{"at " + convertDate(review.date)}</div>
          {user && commentUsers.current._id === user._id &&
            <div
              className={cx("old-comment__actions")}
              onClick={() => {
                wrapperRef.current.style.display = "none";
                handleDeleteReview(review._id);
              }}
            >
              Delete
            </div>
          }
        </div>
        <div className={cx("old-comment__content")}>{review.content}</div>
      </div>
    </div>}
  </div >
}

export default OldReview;