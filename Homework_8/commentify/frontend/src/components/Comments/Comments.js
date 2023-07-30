import React, { useState } from "react";

import { AddComment, Comment } from "../../components";
import DeleteDialog from "../Post/DeleteDialog";
import InButton from "../../UI/InButton";

import { deleteComment } from "../../api/api";

import { sort } from "../../helpers";
import { ASCENDING, DESCENDING } from "../../constants";
import upSort from "../../assets/upsort.png";
import downSort from "../../assets/downsort.png";
import classes from "./Comments.module.css";

function Comments({ comsData, postId }) {
  const [sortDir, setSortDir] = useState(DESCENDING);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [comments, setComments] = useState(
    sort(comsData, DESCENDING, "rating")
  );

  const changeSortDirection = () => {
    setSortDir(sortDir === DESCENDING ? ASCENDING : DESCENDING);
    setComments(
      sort(comments, sortDir === DESCENDING ? ASCENDING : DESCENDING, "rating")
    );
  };

  const drawSortDirection = () => {
    return sortDir === DESCENDING ? (
      <div className={classes.sort}>
        <span>Highest rated</span>
        <InButton onClick={changeSortDirection}>
          <img src={upSort} alt="sortDir" />
        </InButton>
      </div>
    ) : (
      <div className={classes.sort}>
        <span>Lowest rated</span>
        <InButton onClick={changeSortDirection}>
          <img src={downSort} alt="sortDir" />
        </InButton>
      </div>
    );
  };

  const handleDeleteDialogState = () => {
    setDeleteDialog((prevDialog) => !prevDialog);
  };

  const deleteCom = async (postId, commentId) => {
    const updatedComments = await deleteComment(postId, commentId);
    setComments(updatedComments.data);
  };

  const refreshComments = (updatedComment) => {
    setComments(sort([...comments, updatedComment], "rating"));
  };

  const drawComments = (comments) => {
    if (comments) {
      return comments.map((com) => {
        return (
          <li key={com.id}>
            <Comment
              comment={com.comment}
              rating={com.rating}
              openDeleteDialog={handleDeleteDialogState}
            />
            <DeleteDialog
              open={deleteDialog}
              handleClose={handleDeleteDialogState}
              deleteComment={() => {
                handleDeleteDialogState();
                deleteCom(postId, com.id);
              }}
            />
          </li>
        );
      });
    }
  };
  return (
    <div className={classes.container}>
      {drawSortDirection()}
      <ul>{drawComments(comments)}</ul>
      <AddComment id={postId} refreshComs={refreshComments} />
    </div>
  );
}

export default Comments;
