import React, { useState } from "react";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { addComment } from "../../Api/api";

import send from "../../assets/send.png";

import classes from "./AddComment.module.css";

function AddComment(props) {
  const [comment, setComment] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [sending, setSending] = useState(false);

  const { id, refreshComs } = props;

  const resetState = () => {
    setComment("");
    setRatingValue(5);
    setSending(false);
  };

  const addCommentHandler = () => {
    if (comment !== "") {
      setSending(true);

      const newComment = {
        comment: comment,
        rating: ratingValue,
      };

      addComment(id, newComment)
        .then((response) => {
          resetState();
          refreshComs(response.data);
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className={classes.container}>
      <textarea
        value={comment}
        placeholder="What do you think about this?"
        onChange={(e) => setComment(e.target.value)}
      />
      <div>
        <Typography component="legend">Rate this post</Typography>
        <Rating
          name="simple-controlled"
          disabled={sending}
          value={ratingValue}
          precision={0.2}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
        />
      </div>
      {sending ? (
        <CircularProgress />
      ) : (
        <img src={send} alt="send" onClick={addCommentHandler} />
      )}
    </div>
  );
}

export default AddComment;
