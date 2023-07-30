import React, { useState } from "react";

import { Header, Posts, Panel, Login } from "../components";
import { useSelector } from "react-redux";
import { getLoginModalStatus } from "../features/loginModalSlice";

function Home(props) {
  const [disablingPost, setDisablingPost] = useState([]);

  const modalOpen = useSelector(getLoginModalStatus);

  const changeStatus = (disabling) => {
    setDisablingPost(disabling);
  };

  return (
    <>
      {modalOpen && <Login />}
      <Header searchBar={true} />
      <Posts disablingPost={disablingPost} />
      <Panel changeStatus={changeStatus} />
    </>
  );
}

export default Home;
