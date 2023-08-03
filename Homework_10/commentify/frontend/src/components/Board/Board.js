import React, { useState } from "react";
import Button from "@mui/material/Button";

import { ASCENDING, DESCENDING } from "../../constants";

import rating from "../../assets/rate.png";

import classes from "./Board.module.css";
import Card from "../../UI/Card";
import { useNavigate } from "react-router-dom";

function Board({
  addPost,
  posts,
  removeHandler,
  sortDir,
  clearDesk,
  allPosts,
}) {
  const [sortDirection, setSortDir] = useState(DESCENDING);
  const navigate = useNavigate();

  const openPostDetails = (id) => {
    navigate(`posts/${id}`);
  };

  const drawPosts = () => {
    return posts.map((post) => {
      return (
        <li
          key={post.id}
          className={classes.post}
          onClick={() => openPostDetails(post.id)}
        >
          <span>{post.title}</span>
          <span>
            <img src={rating} alt="rating" />
            <span>{post.average}</span>
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                removeHandler(post.id);
              }}
            >
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
