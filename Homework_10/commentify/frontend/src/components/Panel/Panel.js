import React, { useEffect, useState } from "react";

import { Board } from "../../components";

import { fetchPosts } from "../../api/api";
import { calculateAverages, sort } from "../../helpers";

import {
  LEFT_POSTS,
  RIGHT_POSTS,
  ASCENDING,
  DESCENDING,
} from "../../constants";

import classes from "./Panel.module.css";
import { useDispatch } from "react-redux";
import { disablePost } from "../../features/postsSlice";

function Panel(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allPosts, setAllPosts] = useState([]);
  const [leftandRightPosts, setLeftAndRightPosts] = useState({
    leftPosts: [],
    rightPosts: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    fetchPosts()
      .then((response) => {
        const withAveragePosts = calculateAverages(response.data).filter(
          (post) => post.average
        );
        setAllPosts(sort(withAveragePosts, DESCENDING, "average"));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

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
      dispatch(disablePost([{ id: pickedPost.id, status: true }]));
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
    dispatch(disablePost([{ id: id, status: false }]));
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

    const disablings = leftandRightPosts[column].map((post) => {
      return { id: post.id, status: false };
    });
    dispatch(disablePost(disablings));
  };

  return !loading && error ? (
    <p>Failed to fetch posts</p>
  ) : (
    <div className={classes.container}>
      <Board
        addPost={(dir) => addPost(LEFT_POSTS, dir)}
        posts={leftandRightPosts.leftPosts}
        removeHandler={(id) => removePost(LEFT_POSTS, id)}
        sortDir={(dir) => changeSortDirection(LEFT_POSTS, dir)}
        clearDesk={() => clearDesk(LEFT_POSTS)}
        allPosts={allPosts}
      />
      <Board
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
