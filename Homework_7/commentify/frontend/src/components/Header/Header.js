import React from "react";

import logo from "../../assets/Commentify.png";

import classes from "./Header.module.css";

function Header(props) {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="logo" />
      <div className={classes.searchBar}>
        <input
          onDragOver={(e) => e.preventDefault()}
          placeholder="Search by Comments"
          type="text"
          onChange={(e) => {
            props.filter(e.target.value);
          }}
        />
      </div>
    </header>
  );
}

export default Header;
