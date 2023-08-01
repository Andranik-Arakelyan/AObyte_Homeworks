import React, { useState } from "react";

import { Post } from "../../components";
import Pagination from "@mui/material/Pagination";

import classes from "./Posts.module.css";
import { useSelector } from "react-redux";
import { getSearchValue } from "../../features/searchSlice";
import { getPosts } from "../../features/postsSlice";

function Posts(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const postEachPage = 3;

  const searchValue = useSelector(getSearchValue);

  const { posts, loading, error } = useSelector(getPosts);

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const drawPosts = (posts) => {
    return posts.map((post) => {
      return !loading && <Post key={post.id} post={post} />;
    });
  };

  const changePage = (e, pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const drawPagination = (n) => {
    return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={n}
        page={currentPage}
        onChange={changePage}
      />
    );
  };

  const totalPages = Math.ceil(posts.length / postEachPage);
  const showedPosts = posts.slice(
    (currentPage - 1) * postEachPage,
    currentPage * postEachPage
  );

  return !loading && error ? (
    <p>Something went wrong</p>
  ) : (
    <section className={classes.container}>
      <ul className={classes.posts}>
        {searchValue.trim() ? drawPosts(filteredPosts) : drawPosts(showedPosts)}
      </ul>
      {!searchValue.trim() && (
        <ul style={{ marginTop: "40px" }}>{drawPagination(totalPages)}</ul>
      )}
    </section>
  );
}

export default Posts;
