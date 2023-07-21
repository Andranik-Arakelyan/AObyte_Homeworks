import React, { useState } from "react";

import { Comment } from "../../components";
import { AddComment } from "../../components";
import DeleteDialog from "./DeleteDialog";

import { ASCENDING, DESCENDING } from "../../constants";

import { sort } from "../../helpers";
import { deleteComment } from "../../Api/api";

import upSort from "../../assets/upsort.png";
import downSort from "../../assets/downsort.png";

import classes from "./Post.module.css";

function Post(props) {
  const { post, id } = props;

  const [sortDir, setSortDir] = useState(DESCENDING);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [comments, setComments] = useState(
    sort(props.post.comments, DESCENDING, "rating")
  );

  const drawComments = () => {
    return comments.map((com) => {
      return (
        <div key={com.id}>
          <Comment
            comment={com.comment}
            rating={com.rating}
            openDeleteDialog={() => setDeleteDialog(true)}
          />
          <DeleteDialog
            open={deleteDialog}
            handleClose={() => setDeleteDialog(false)}
            deleteComment={() => {
              setDeleteDialog(false);
              deleteCom(id, com.id);
            }}
          />
        </div>
      );
    });
  };

  const refreshComments = (updatedComment) => {
    setComments(sort([...comments, updatedComment], "rating"));
  };

  const deleteCom = async (postId, commentId) => {
    const updatedComments = await deleteComment(postId, commentId);
    setComments(updatedComments.data);
  };

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
        <img src={upSort} alt="sortDir" onClick={changeSortDirection} />
      </div>
    ) : (
      <div className={classes.sort}>
        <span>Lowest rated</span>
        <img src={downSort} alt="sortDir" onClick={changeSortDirection} />
      </div>
    );
  };

  return (
    <li className={`${classes.post} ${post.selected ? classes.disabled : ""}`}>
      <h3>{post.title}</h3>
      {drawSortDirection()}
      <ul className={classes.comments}>{drawComments()}</ul>
      <AddComment id={id} refreshComs={refreshComments} />
    </li>
  );
}

export default Post;
