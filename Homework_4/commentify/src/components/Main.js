import React, { Component } from "react";
import classes from "./Main.module.css";
import Card from "./Card";
import sort from "../helpers/sort";
import { DUMMY_LIST } from "../constants/posts";
import {
  ASCENDING,
  DESCENDING,
  LEFT_POSTS,
  RIGHT_POSTS,
} from "../constants/text";

class Main extends Component {
  constructor(props) {
    super(props);
    this.initialPosts = sort(DUMMY_LIST);
    this.state = {
      allPosts: this.initialPosts,
      leftPosts: [],
      rightPosts: [],
    };
  }

  addPost = (column, dir) => {
    if (this.state.allPosts.length) {
      if (dir === ASCENDING) {
        this.setState({
          [column]: sort(
            [
              ...this.state[column],
              this.state.allPosts[this.state.allPosts.length - 1],
            ],
            ASCENDING
          ),
          allPosts: this.state.allPosts.slice(0, -1),
        });
      } else {
        this.setState({
          [column]: sort(
            [...this.state[column], this.state.allPosts[0]],
            DESCENDING
          ),
          allPosts: this.state.allPosts.slice(1),
        });
      }
    }
  };

  removePost = (column, id) => {
    this.setState({
      [column]: this.state[column].filter((item) => item.id !== id),
      allPosts: sort([
        ...this.state.allPosts,
        this.state[column].find((item) => item.id === id),
      ]),
    });
  };

  changeSortDirection = (column, dir) => {
    this.setState({ [column]: sort(this.state[column], dir) });
  };

  clearDesk = (column) => {
    this.setState({
      [column]: [],
      allPosts: sort([...this.state.allPosts, ...this.state[column]]),
    });
  };

  render() {
    return (
      <div className={classes.container}>
        <Card
          addPost={(dir) => this.addPost(LEFT_POSTS, dir)}
          posts={this.state.leftPosts}
          removeHandler={(id) => this.removePost(LEFT_POSTS, id)}
          sortDir={(dir) => this.changeSortDirection(LEFT_POSTS, dir)}
          clearDesk={() => this.clearDesk(LEFT_POSTS)}
        />
        <Card
          addPost={(dir) => this.addPost(RIGHT_POSTS, dir)}
          posts={this.state.rightPosts}
          removeHandler={(id) => this.removePost(RIGHT_POSTS, id)}
          sortDir={(dir) => this.changeSortDirection(RIGHT_POSTS, dir)}
          clearDesk={() => this.clearDesk(RIGHT_POSTS)}
        />
      </div>
    );
  }
}

export default Main;
