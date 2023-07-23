import React, { useState } from "react";
import Button from "@mui/material/Button";

import { ASCENDING, DESCENDING } from "../../constants";

import rating from "../../assets/rate.png";

import classes from "./Board.module.css";
import Card from "../../UI/Card";

function Board(props) {
  const [sortDirection, setSortDir] = useState(DESCENDING);

  const { addPost, posts, removeHandler, sortDir, clearDesk, allPosts } = props;

  const drawPosts = () => {
    return posts.map((post, id) => {
      return (
        <li key={id} className={classes.post}>
          <span>{post.title}</span>
          <span>
            <img src={rating} alt="rating" />
            <span>{post.average}</span>
            <Button variant="contained" onClick={() => removeHandler(post.id)}>
              -
            </Button>
          </span>
        </li>
      );
    });
  };

  return (
    <Card>
      <div className={classes.actions}>
        <Button
          variant="contained"
          className={classes.actionButton}
          onClick={() => addPost(sortDirection)}
          disabled={!allPosts.length}
        >
          +
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setSortDir(sortDirection === ASCENDING ? DESCENDING : ASCENDING);
            sortDir(`${sortDirection === ASCENDING ? DESCENDING : ASCENDING}`);
          }}
        >
          {sortDirection === DESCENDING
            ? "Sort by ascending"
            : "Sort by descending"}
        </Button>
        <Button variant="contained" onClick={clearDesk}>
          Clear All
        </Button>
      </div>
      <ul className={classes.posts}>{drawPosts()}</ul>
    </Card>
  );
}

export default Board;
