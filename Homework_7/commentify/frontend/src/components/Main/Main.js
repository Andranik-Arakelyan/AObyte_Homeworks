import React, { useState } from "react";

import { Header, Posts, Panel } from "../../components";

function Main(props) {
  const [searchValue, setSearchValue] = useState("");
  const [disablingPost, setDisablingPost] = useState([]);

  const changeSearchValue = (value) => {
    setSearchValue(value);
  };

  const changeStatus = (disabling) => {
    setDisablingPost(disabling);
  };

  return (
    <>
      <Header changeSearchValue={changeSearchValue} searchValue={searchValue} />
      <Posts searchValue={searchValue} disablingPost={disablingPost} />
      <Panel changeStatus={changeStatus} />
    </>
  );
}

export default Main;
