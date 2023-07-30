import React, { useState } from "react";
import { getRandomAvatar } from "../../helpers";

import InButton from "../../UI/InButton";

import rate from "../../assets/rate.png";
import remove from "../../assets/delete.png";
import like from "../../assets/like.png";
import replyIcon from "../../assets/reply.png";

import classes from "./Comment.module.css";
import Replies from "./Replies";

function Comment({ openDeleteDialog, commentData }) {
  const { id: comId, comment, replies: comReplies, rating } = commentData;
  const avatar = getRandomAvatar();
  const [openReplies, setOpenReplies] = useState(false);
  const [replies, setReplies] = useState(comReplies || []);

  const handleRepliesModal = () => {
    setOpenReplies((prevOpenReplies) => !prevOpenReplies);
  };

  const handlerepliesRefresh = (newReplies) => {
    setReplies(newReplies);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={classes.commentContainer}>
        <div className={classes.comment}>
          <img src={avatar} alt="avatar" />
          <p>{comment}</p>
        </div>

        <div className={classes.actions}>
          <InButton onClick={openDeleteDialog}>
            <img className={classes.deleteButton} src={remove} alt="delete" />
          </InButton>

          <div className={classes.rate}>
            <img src={rate} alt="rate" />
            <span>{rating}</span>
          </div>
        </div>
      </div>

      <div className={classes.likeReply}>
        <InButton>
          <img src={like} alt="like" />
          <span>Like</span>
        </InButton>
        <InButton onClick={() => handleRepliesModal()}>
          <img src={replyIcon} alt="reply" />
          <span>Reply</span>
        </InButton>
      </div>

      {openReplies && (
        <Replies
          comment={comment}
          comId={comId}
          replies={replies}
          refreshReplies={(newReplies) => handlerepliesRefresh(newReplies)}
          onClose={handleRepliesModal}
        />
      )}
    </div>
  );
}

export default Comment;
