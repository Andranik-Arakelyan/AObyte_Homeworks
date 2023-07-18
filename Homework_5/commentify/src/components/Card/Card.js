import React, { Component } from "react";
import classes from "./Card.module.css";
import rating from "../../assets/rate.png";
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
            {post.average}
            <button onClick={() => this.props.removeHandler(post.id)}>-</button>
          </span>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={classes.desk}>
        <div className={classes.actions}>
          <button
            className={classes.actionButton}
            onClick={() => this.props.addPost(this.state.sortDirection)}
          >
            +
          </button>
          <button
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
          </button>
          <button onClick={this.props.clearDesk}>Clear All</button>
        </div>
        <ul className={classes.posts}>{this.drawPosts()}</ul>
      </div>
    );
  }
}

export default Card;
