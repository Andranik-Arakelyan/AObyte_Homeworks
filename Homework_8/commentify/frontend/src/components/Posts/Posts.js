import React, { useEffect, useState } from "react";

import { Post } from "../../components";
import Pagination from "@mui/material/Pagination";

import { calculateAverages } from "../../helpers";

import classes from "./Posts.module.css";
import { fetchPosts } from "../../api/api";
import { useSelector } from "react-redux";
import { getSearchValue } from "../../features/searchSlice";

function Posts({ disablingPost }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pool, setPool] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postEachPage = 3;

  const searchValue = useSelector(getSearchValue);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setLoading(false);
        setPosts(calculateAverages(response.data));
        setPool(calculateAverages(response.data));
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  useEffect(() => {
    const filteredPosts = pool.filter((post) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setPosts(filteredPosts);
  }, [searchValue, pool]);

  useEffect(() => {
    disablingPost.forEach((disabling) => {
      setPool((prevPool) => {
        const index = prevPool.findIndex((post) => {
          return disabling.id === post.id;
        });
        const newPosts = [...prevPool];
        newPosts[index] = {
          ...newPosts[index],
          selected: disabling.status,
        };
        return newPosts;
      });
    });
  }, [disablingPost]);

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

  const totalPages = Math.ceil(pool.length / postEachPage);
  const showedPosts = pool.slice(
    (currentPage - 1) * postEachPage,
    currentPage * postEachPage
  );

  return !loading && error ? (
    <p>Something went wrong</p>
  ) : (
    <section className={classes.container}>
      <ul className={classes.posts}>
        {searchValue.trim() ? drawPosts(posts) : drawPosts(showedPosts)}
      </ul>
      {!searchValue.trim() && (
        <ul style={{ marginTop: "40px" }}>{drawPagination(totalPages)}</ul>
      )}
    </section>
  );
}

export default Posts;
