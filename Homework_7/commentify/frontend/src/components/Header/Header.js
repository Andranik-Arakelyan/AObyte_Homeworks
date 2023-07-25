import React from "react";

import logo from "../../assets/Commentify.png";

import classes from "./Header.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { HOME_PAGE, SIGN_UP } from "../../constants/path";

function Header({ changeSearchValue, searchValue, openLoginModal, searchBar }) {
  return (
    <header className={classes.header}>
      <Link to={HOME_PAGE}>
        <img className={classes.logo} src={logo} alt="logo" />
      </Link>
      <div className={classes.searchBar}>
        {searchBar && (
          <input
            onDragOver={(e) => e.preventDefault()}
            placeholder="Find a post"
            value={searchValue}
            type="text"
            onChange={(e) => {
              changeSearchValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className={classes.login}>
        <Link to={SIGN_UP}>Sign up</Link>
        <Button variant="outlined" onClick={openLoginModal}>
          Log In
        </Button>
      </div>
    </header>
  );
}

export default Header;
