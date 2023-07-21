import React, { Component, useState } from "react";

import { Post } from "../../components";
import Pagination from "@mui/material/Pagination";

import classes from "./Posts.module.css";

function Posts(props) {
  const postEachPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const drawPosts = (posts) => {
    return posts.map((post) => {
      return <Post key={post.id} post={post} id={post.id} />;
    });
  };

  const changePage = (e, pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const drawPageNumbers = (n) => {
    return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={n}
        page={currentPage}
        onChange={changePage}
      />
    );
  };

  const totalPages = Math.ceil(props.posts.length / postEachPage);
  const showedPosts = props.posts.slice(
    (currentPage - 1) * postEachPage,
    currentPage * postEachPage
  );

  return (
    <section className={classes.container}>
      <ul className={classes.posts}>{drawPosts(showedPosts)}</ul>
      <ul style={{ marginTop: "40px" }}>{drawPageNumbers(totalPages)}</ul>
    </section>
  );
}

export default Posts;
