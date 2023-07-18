import React, { Component } from "react";
import search from "../../assets/search.png";
import logo from "../../assets/logo.png";
import classes from "./Header.module.css";

class Header extends Component {
  state = {
    searchValue: "",
  };
  render() {
    return (
      <header className={classes.header}>
        <img className={classes.logo} src={logo} alt="logo" />
        <div className={classes.searchBar}>
          <input
            placeholder="Search by Comments"
            type="text"
            onChange={(e) => {
              this.props.filter(e.target.value);
            }}
          />
          <img src={search} alt="search" />
        </div>
      </header>
    );
  }
}

export default Header;
