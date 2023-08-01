import React from "react";

import { Comments } from "../../components";
import Card from "../../UI/Card";

import { Link } from "react-router-dom";

import { PostDataContext } from "../../context";

import classes from "./Post.module.css";

function Post({ post }) {
  return (
    <PostDataContext.Provider value={post}>
      <Card disabled={post.selected ? "disabled" : ""}>
        <div className={classes.title}>
          <Link to={`posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
        </div>
        <div className={classes.comments}>
          <Comments comsData={post.comments} />
        </div>
      </Card>
    </PostDataContext.Provider>
  );
}

export default Post;
