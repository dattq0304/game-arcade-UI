import classnames from "classnames/bind";
import { useState, useEffect, useContext, useRef } from "react";

import { UserContext } from "~/store/userContext";
import styles from "./OldComment.module.scss";
import * as UserService from "~/api/services/user";
import * as CommentService from "~/api/services/comment";

const cx = classnames.bind(styles);

function OldComment({ comment, handleDeleteComment }) {
  const [isLoading, setIsLoading] = useState(null);
  const commentUsers = useRef();
  const user = useContext(UserContext);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const res = await UserService.getUser(comment.user_id);
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
        <img src={commentUsers.current.profile_image} />
      </div>
      <div className={cx("old-comment__main")}>
        <div className={cx("old-comment__header")}>
          <strong>{commentUsers.current.username}</strong>
          <div className={cx("old-comment__date")}>{"at " + convertDate(comment.create_date)}</div>
          {user && commentUsers.current._id === user._id &&
            <div
              className={cx("old-comment__actions")}
              onClick={() => {
                wrapperRef.current.style.display = "none";
                handleDeleteComment(comment._id);
              }}
            >
              Delete
            </div>
          }
        </div>
        <div className={cx("old-comment__content")}>{comment.content}</div>
      </div>
    </div>}
  </div >
}

export default OldComment;