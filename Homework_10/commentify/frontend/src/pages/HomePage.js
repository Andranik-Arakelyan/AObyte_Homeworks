import React, { useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { Header, Posts, Panel, Login } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { getLoginModalStatus } from "../features/loginModalSlice";
import { downloadPosts, getPosts } from "../features/postsSlice";

function HomePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(downloadPosts());
  }, [dispatch]);

  const loginModalOpen = useSelector(getLoginModalStatus);
  const { loading, error } = useSelector(getPosts);

  if (loading) {
    return (
      <>
        <Header searchBar={true} />
        <CircularProgress />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      {loginModalOpen && <Login />}
      <Header searchBar={true} />
      <Posts />
      <Panel />
    </>
  );
}

export default HomePage;
