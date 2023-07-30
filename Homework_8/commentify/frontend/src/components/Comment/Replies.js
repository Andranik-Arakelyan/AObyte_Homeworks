import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import { Backdrop } from "../../UI/Backdrop";
import Card from "../../UI/Card";
import InButton from "../../UI/InButton";
import classes from "./Replies.module.css";
import close from "../../assets/close.png";
import { replyToComment } from "../../api/api";
import { PostDataContext } from "../../context";

const RepliesModal = ({ replies, comment, onClose, comId, refreshReplies }) => {
  const postData = useContext(PostDataContext);
  const [reply, setReply] = useState("");
  const handelReplyChange = (value) => setReply(value);

  const addReply = () => {
    const newReply = {
      text: reply,
    };

    replyToComment(postData.id, comId, newReply)
      .then((response) => {
        refreshReplies(response.data);
        setReply("");
      })
      .catch((err) => console.log(err.message));
  };
  const drawReplies = () => {
    if (replies) {
      return (
        <ul className={classes.replyList}>
          {replies.map((reply) => {
            return (
              <li key={reply.id}>
                <p>{reply.text}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <Card modal="modal">
      <div className={classes.container}>
        <div className={classes.comment}>
          <p>{comment}</p>
          <InButton onClick={onClose}>
            <img src={close} alt="" />
          </InButton>
        </div>

        <div className={classes.replies}>{drawReplies()}</div>

        <div className={classes.newReply}>
          <input
            type="text"
            value={reply}
            onChange={(e) => handelReplyChange(e.target.value)}
          />
          <button onClick={addReply}>Reply</button>
        </div>
      </div>
    </Card>
  );
};

function Replies({ comment, replies, onClose, comId, refreshReplies }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("back-drop")
      )}
      {ReactDOM.createPortal(
        <RepliesModal
          replies={replies}
          comment={comment}
          onClose={onClose}
          comId={comId}
          refreshReplies={refreshReplies}
        />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default Replies;
