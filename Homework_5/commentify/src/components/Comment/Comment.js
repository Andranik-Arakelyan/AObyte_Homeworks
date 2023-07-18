import React, { Component } from "react";
import avatar from "../../assets/avatar.png";
import rate from "../../assets/rate.png";
import classes from "./Comment.module.css";

class Comment extends Component {
  render() {
    return (
      <div className={classes.container}>
        <img src={avatar} alt="avatar" />
        <p>{this.props.comment}</p>
        <div className={classes.rate}>
          <img src={rate} alt="avatar" />
          <span>{this.props.rating}</span>
        </div>
      </div>
    );
  }
}

export default Comment;
