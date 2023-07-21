import React, { useEffect, useState } from "react";

import { Card } from "../../components";

import { sort } from "../../helpers";

import {
  LEFT_POSTS,
  RIGHT_POSTS,
  ASCENDING,
  DESCENDING,
} from "../../constants";

import classes from "./Panel.module.css";

function Panel(props) {
  const [allPosts, setAllPosts] = useState([]);

  const [leftandRightPosts, setLeftAndRightPosts] = useState({
    leftPosts: [],
    rightPosts: [],
  });

  const { posts, changeStatus } = props;

  useEffect(() => {
    setAllPosts(sort(posts, DESCENDING, "average"));
  }, [posts]);

  const addPost = (column, dir) => {
    if (allPosts.length) {
      let pickedPost;
      if (dir === ASCENDING) {
        pickedPost = allPosts[allPosts.length - 1];
        setAllPosts((prevAllPosts) => prevAllPosts.slice(0, -1));
      } else {
        pickedPost = allPosts[0];
        setAllPosts((prevAllPosts) => prevAllPosts.slice(1));
      }

      setLeftAndRightPosts({
        ...leftandRightPosts,
        [column]: sort(
          [...leftandRightPosts[column], pickedPost],
          dir,
          "average"
        ),
      });
      changeStatus(pickedPost.id, true);
    }
  };

  const removePost = (column, id) => {
    setLeftAndRightPosts({
      ...leftandRightPosts,
      [column]: leftandRightPosts[column].filter((item) => item.id !== id),
    });

    setAllPosts(
      sort(
        [...allPosts, leftandRightPosts[column].find((item) => item.id === id)],
        DESCENDING,
        "average"
      )
    );

    changeStatus(id, false);
  };

  const changeSortDirection = (column, dir) => {
    setLeftAndRightPosts({
      ...leftandRightPosts,
      [column]: sort(leftandRightPosts[column], dir, "average"),
    });
  };

  const clearDesk = (column) => {
    setLeftAndRightPosts({ ...leftandRightPosts, [column]: [] });

    setAllPosts((prevAllPosts) => {
      return sort(
        [...prevAllPosts, ...leftandRightPosts[column]],
        DESCENDING,
        "average"
      );
    });

    leftandRightPosts[column].forEach((post) => {
      changeStatus(post.id, false);
    });
  };

  return (
    <div className={classes.container}>
      <Card
        addPost={(dir) => addPost(LEFT_POSTS, dir)}
        posts={leftandRightPosts.leftPosts}
        removeHandler={(id) => removePost(LEFT_POSTS, id)}
        sortDir={(dir) => changeSortDirection(LEFT_POSTS, dir)}
        clearDesk={() => clearDesk(LEFT_POSTS)}
        allPosts={allPosts}
      />
      <Card
        addPost={(dir) => addPost(RIGHT_POSTS, dir)}
        posts={leftandRightPosts.rightPosts}
        removeHandler={(id) => removePost(RIGHT_POSTS, id)}
        sortDir={(dir) => changeSortDirection(RIGHT_POSTS, dir)}
        clearDesk={() => clearDesk(RIGHT_POSTS)}
        allPosts={allPosts}
      />
    </div>
  );
}

export default Panel;
