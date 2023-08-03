import React from "react";

import { Board } from "../../components";

import { LEFT_POSTS, RIGHT_POSTS, ASCENDING } from "../../constants";

import classes from "./Panel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { disablePost } from "../../features/postsSlice";
import {
  addPost,
  changeSortDirection,
  clearDesk,
  getPanel,
  removePost,
} from "../../features/panelSlice";

function Panel(props) {
  const dispatch = useDispatch();
  const panel = useSelector(getPanel);
  const { allPosts, leftPosts, rightPosts } = panel;

  const addPostHandler = (column, dir) => {
    const id =
      dir === ASCENDING ? allPosts[allPosts.length - 1].id : allPosts[0].id;
    dispatch(addPost(column, dir));
    dispatch(disablePost([{ id, status: true }]));
  };

  const removePostHandler = (column, id) => {
    dispatch(removePost(column, id));
    dispatch(disablePost([{ id, status: false }]));
  };

  const changeSortDirectionHandler = (column, dir) => {
    dispatch(changeSortDirection(column, dir));
  };

  const clearDeskHandler = (column) => {
    dispatch(clearDesk(column));
    dispatch(disablePost(panel[column]));
  };

  return (
    <div className={classes.container}>
      <Board
        addPost={(dir) => addPostHandler(LEFT_POSTS, dir)}
        posts={leftPosts}
        removeHandler={(id) => removePostHandler(LEFT_POSTS, id)}
        sortDir={(dir) => changeSortDirectionHandler(LEFT_POSTS, dir)}
        clearDesk={() => clearDeskHandler(LEFT_POSTS)}
        allPosts={allPosts}
      />
      <Board
        addPost={(dir) => addPostHandler(RIGHT_POSTS, dir)}
        posts={rightPosts}
        removeHandler={(id) => removePostHandler(RIGHT_POSTS, id)}
        sortDir={(dir) => changeSortDirectionHandler(RIGHT_POSTS, dir)}
        clearDesk={() => clearDeskHandler(RIGHT_POSTS)}
        allPosts={allPosts}
      />
    </div>
  );
}

export default Panel;
