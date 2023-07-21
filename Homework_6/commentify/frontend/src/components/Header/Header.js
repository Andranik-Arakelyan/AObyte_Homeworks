import React, { Component } from "react";
import logo from "../../assets/Commentify.png";
import classes from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        <img className={classes.logo} src={logo} alt="logo" />
        <div className={classes.searchBar}>
          <input
            onDragOver={(e) => e.preventDefault()}
            placeholder="Search by Comments"
            type="text"
            onChange={(e) => {
              this.props.filter(e.target.value);
            }}
          />
        </div>
      </header>
    );
  }
}

export default Header;
