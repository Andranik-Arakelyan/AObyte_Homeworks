import React, { useState } from "react";

import { Header, Posts, Panel, Login } from "../components";

function Home(props) {
  const [searchValue, setSearchValue] = useState("");
  const [disablingPost, setDisablingPost] = useState([]);
  const [loginModal, setLoginModal] = useState(false);

  const changeSearchValue = (value) => {
    setSearchValue(value);
  };

  const changeStatus = (disabling) => {
    setDisablingPost(disabling);
  };

  const handleLoginModal = () => {
    setLoginModal((prevLoginModal) => !prevLoginModal);
  };

  return (
    <>
      {loginModal && <Login onClose={handleLoginModal} />}
      <Header
        searchBar={true}
        changeSearchValue={changeSearchValue}
        searchValue={searchValue}
        openLoginModal={handleLoginModal}
      />
      <Posts searchValue={searchValue} disablingPost={disablingPost} />
      <Panel changeStatus={changeStatus} />
    </>
  );
}

export default Home;
