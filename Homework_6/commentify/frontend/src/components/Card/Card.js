import React, { Component } from "react";
import Button from "@mui/material/Button";

import rating from "../../assets/rate.png";
import classes from "./Card.module.css";
import { ASCENDING, DESCENDING } from "../../constants/text";

class Card extends Component {
  state = {
    sortDirection: DESCENDING,
  };

  drawPosts = () => {
    return this.props.posts.map((post, id) => {
      return (
        <li key={id} className={classes.post}>
          <span>{post.title}</span>
          <span>
            <img src={rating} alt="rating" />
            <span>{post.average}</span>
            <Button
              variant="contained"
              onClick={() => this.props.removeHandler(post.id)}
            >
              -
            </Button>
          </span>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={classes.desk}>
        <div className={classes.actions}>
          <Button
            variant="contained"
            className={classes.actionButton}
            onClick={() => this.props.addPost(this.state.sortDirection)}
            disabled={!this.props.allPosts.length}
          >
            +
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              this.setState({
                sortDirection:
                  this.state.sortDirection === ASCENDING
                    ? DESCENDING
                    : ASCENDING,
              });
              this.props.sortDir(
                `${
                  this.state.sortDirection === ASCENDING
                    ? DESCENDING
                    : ASCENDING
                }`
              );
            }}
          >
            {this.state.sortDirection === DESCENDING
              ? "Sort by ascending"
              : "Sort by descending"}
          </Button>
          <Button variant="contained" onClick={this.props.clearDesk}>
            Clear All
          </Button>
        </div>
        <ul className={classes.posts}>{this.drawPosts()}</ul>
      </div>
    );
  }
}

export default Card;
