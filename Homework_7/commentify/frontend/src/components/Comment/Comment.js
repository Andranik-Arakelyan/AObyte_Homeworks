import React, { Component } from "react";
import { getRandomAvatar } from "../../helpers";

import rate from "../../assets/rate.png";
import remove from "../../assets/delete.png";

import classes from "./Comment.module.css";

class Comment extends Component {
  state = {
    avatar: getRandomAvatar(),
  };
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.comment}>
          <img src={this.state.avatar} alt="avatar" />
          <p>{this.props.comment}</p>
        </div>
        <div className={classes.actions}>
          <img
            className={classes.deleteButton}
            src={remove}
            alt="delete"
            onClick={this.props.openDeleteDialog}
          />
          <div className={classes.rate}>
            <img src={rate} alt="rate" />
            <span>{this.props.rating}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
