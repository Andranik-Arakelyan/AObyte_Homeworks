import React from "react";

import logo from "../../assets/Commentify.png";

import classes from "./Header.module.css";
import { Button } from "@mui/material";

function Header({ changeSearchValue, searchValue }) {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="logo" />
      <div className={classes.searchBar}>
        <input
          onDragOver={(e) => e.preventDefault()}
          placeholder="Find a post"
          value={searchValue}
          type="text"
          onChange={(e) => {
            changeSearchValue(e.target.value);
          }}
        />
      </div>
      <div className={classes.login}>
        <Button variant="outlined">Log In</Button>
      </div>
    </header>
  );
}

export default Header;
