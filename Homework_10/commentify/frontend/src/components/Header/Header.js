import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSearchValue, setSearchValue } from "../../features/searchSlice";
import { changeLoginModalStatus } from "../../features/loginModalSlice";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { HOME_PAGE, SIGN_UP } from "../../constants/path";

import logo from "../../assets/Commentify.png";

import classes from "./Header.module.css";

function Header({ searchBar }) {
  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValue);
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
              dispatch(setSearchValue(e.target.value));
            }}
          />
        )}
      </div>
      <div className={classes.login}>
        <Link to={SIGN_UP}>Sign up</Link>
        <Button
          variant="outlined"
          onClick={() => dispatch(changeLoginModalStatus(true))}
        >
          Log In
        </Button>
      </div>
    </header>
  );
}

export default Header;
