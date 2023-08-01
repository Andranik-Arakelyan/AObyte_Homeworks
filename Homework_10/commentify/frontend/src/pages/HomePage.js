import React, { useEffect } from "react";

import { Header, Posts, Panel, Login } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getLoginModalStatus } from "../features/loginModalSlice";
import { downloadPosts } from "../features/postsSlice";

function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(downloadPosts());
  }, [dispatch]);

  const loginModalOpen = useSelector(getLoginModalStatus);

  return (
    <>
      {loginModalOpen && <Login />}
      <Header searchBar={true} />
      <Posts />
      <Panel />
    </>
  );
}

export default Home;
