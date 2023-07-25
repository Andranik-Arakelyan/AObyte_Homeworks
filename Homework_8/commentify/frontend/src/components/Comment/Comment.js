import React from "react";
import { getRandomAvatar } from "../../helpers";

import rate from "../../assets/rate.png";
import remove from "../../assets/delete.png";

import classes from "./Comment.module.css";
import InButton from "../../UI/InButton";

function Comment({ comment, rating, openDeleteDialog }) {
  const avatar = getRandomAvatar();

  return (
    <div className={classes.container}>
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
  );
}

export default Comment;
