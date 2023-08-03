import React, { useContext, useState } from "react";

import { AddComment, Comment } from "../../components";
import DeleteDialog from "../Post/DeleteDialog";
import InButton from "../../UI/InButton";

import { sort } from "../../helpers";
import { ASCENDING, DESCENDING } from "../../constants";
import upSort from "../../assets/upsort.png";
import downSort from "../../assets/downsort.png";
import classes from "./Comments.module.css";
import { PostDataContext } from "../../context";
import { useDispatch } from "react-redux";
import { deleteCom, updateComments } from "../../features/postsSlice";

function Comments({ comsData }) {
  const postData = useContext(PostDataContext);
  const [sortDir, setSortDir] = useState(DESCENDING);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const comments = sort(comsData, DESCENDING, "rating");

  const dispatch = useDispatch();

  const changeSortDirection = () => {
    setSortDir(sortDir === DESCENDING ? ASCENDING : DESCENDING);
    const newSortedComments = sort(
      comments,
      sortDir === DESCENDING ? ASCENDING : DESCENDING,
      "rating"
    );
    dispatch(updateComments(postData.id, newSortedComments));
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

  const deleteCommentHandler = (postId, commentId) => {
    dispatch(deleteCom(postId, commentId));
  };

  const drawComments = (comments) => {
    if (comments) {
      return comments.map((com) => {
        return (
          <li key={com.id}>
            <Comment
              commentData={com}
              postId={postData.id}
              openDeleteDialog={handleDeleteDialogState}
            />
            <DeleteDialog
              open={deleteDialog}
              handleClose={handleDeleteDialogState}
              deleteComment={() => {
                handleDeleteDialogState();
                deleteCommentHandler(postData.id, com.id);
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
      <AddComment id={postData.id} />
    </div>
  );
}

export default Comments;
