import React, { Component } from "react";
import Card from "./Card";
import {
  LEFT_POSTS,
  RIGHT_POSTS,
  ASCENDING,
  DESCENDING,
} from "../constants/text";
import sort from "../helpers/sort";
import classes from "./Panel.module.css";

class Panel extends Component {
  constructor(props) {
    super(props);
    this.initialPosts = sort(this.props.posts);
    this.state = {
      allPosts: this.initialPosts,
      leftPosts: [],
      rightPosts: [],
    };
  }

  addPost = (column, dir) => {
    if (this.state.allPosts.length) {
      let pickedPost;
      if (dir === ASCENDING) {
        pickedPost = this.state.allPosts[this.state.allPosts.length - 1];
        this.setState({
          [column]: sort([...this.state[column], pickedPost], ASCENDING),
          allPosts: this.state.allPosts.slice(0, -1),
        });
      } else {
        pickedPost = this.state.allPosts[0];
        this.setState({
          [column]: sort([...this.state[column], pickedPost], DESCENDING),
          allPosts: this.state.allPosts.slice(1),
        });
      }
      this.props.changeStatus(pickedPost.id, true);
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
    this.props.changeStatus(id, false);
  };

  changeSortDirection = (column, dir) => {
    this.setState({ [column]: sort(this.state[column], dir) });
  };

  clearDesk = (column) => {
    this.setState({
      [column]: [],
      allPosts: sort([...this.state.allPosts, ...this.state[column]]),
    });
    this.state[column].forEach((post) =>
      this.props.changeStatus(post.id, false)
    );
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

export default Panel;
