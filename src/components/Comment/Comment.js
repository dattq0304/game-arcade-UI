import classnames from "classnames/bind";
import { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "~/store/userContext";
import styles from "./Comment.module.scss";
import * as CommentService from "~/api/services/comment";
import OldComment from "./OldComment/OldComment";

const cx = classnames.bind(styles);

function Comment({ gameId }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [placeholder, setPlaceholder] = useState("Write your comment");
  const comments = useRef([]);
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length > 0) {
      const res = await CommentService.postComment({
        gameId: gameId,
        content: content.trim(),
      });
      comments.current.push(res);
      setContent("");
    } else {
      setPlaceholder("The comment must has valid content");
    }
  };

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      const res = await CommentService.getComments(gameId);
      comments.current = res;
      setIsLoading(false);
    };
    getComments();
  }, []);

  const handleDeleteComment = async (id) => {
    const res = await CommentService.deleteComment(id);
    const index = comments.current.indexOf(res);
    comments.current.splice(index, 1);
  };

  return <div className={cx("wrapper")}>
    <div className={cx("comment-input")}>
      {comments.current && <h3>Comments: {comments.current.length}</h3>}
      {user && <form onSubmit={handleSubmit}>
        <div className={cx("input-wrapper")}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
          />
          <FontAwesomeIcon className={cx("input-icon")} icon={faPaperPlane} />
        </div>
      </form>}
      <div className={cx("old-comment-wrapper")} >
        {comments.current.map((comment, index) => {
          return <OldComment comment={comment} key={index} handleDeleteComment={handleDeleteComment} />
        })
        }
      </div>
    </div>
  </div>
}

export default Comment;