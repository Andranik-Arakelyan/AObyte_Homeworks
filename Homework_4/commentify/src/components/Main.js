import React, { Component } from "react";
import classes from "./Main.module.css";
import Card from "./Card";
import { DUMMY_LIST } from "../constants/posts";
import sort from "../helpers/sort";

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

  addToLeft = (dir) => {
    if (this.state.allPosts.length) {
      if (dir === "ascending") {
        this.setState({
          leftPosts: sort(
            [
              ...this.state.leftPosts,
              this.state.allPosts[this.state.allPosts.length - 1],
            ],
            "ascending"
          ),
          allPosts: this.state.allPosts.slice(0, -1),
        });
      } else {
        this.setState({
          leftPosts: sort(
            [...this.state.leftPosts, this.state.allPosts[0]],
            "descending"
          ),
          allPosts: this.state.allPosts.slice(1),
        });
      }
    }
  };

  addToRight = (dir) => {
    if (this.state.allPosts.length) {
      if (dir === "ascending") {
        this.setState({
          rightPosts: sort(
            [
              ...this.state.rightPosts,
              this.state.allPosts[this.state.allPosts.length - 1],
            ],
            "ascending"
          ),
          allPosts: this.state.allPosts.slice(0, -1),
        });
      } else {
        this.setState({
          rightPosts: sort(
            [...this.state.rightPosts, this.state.allPosts[0]],
            "descending"
          ),
          allPosts: this.state.allPosts.slice(1),
        });
      }
    }
  };

  removeFromLeft = (id) => {
    this.setState({
      leftPosts: this.state.leftPosts.filter((item) => item.id !== id),
      allPosts: sort([
        ...this.state.allPosts,
        this.state.leftPosts.find((item) => item.id === id),
      ]),
    });
  };

  removeFromRight = (id) => {
    this.setState({
      rightPosts: this.state.rightPosts.filter((item) => item.id !== id),
      allPosts: sort([
        ...this.state.allPosts,
        this.state.rightPosts.find((item) => item.id === id),
      ]),
    });
  };

  changeSortDirection = (column, dir) => {
    this.setState({ [column]: sort(this.state[column], dir) });
  };

  clearDesk = (desk) => {
    this.setState({
      [desk]: [],
      allPosts: sort([...this.state.allPosts, ...this.state[desk]]),
    });
  };
  render() {
    return (
      <div className={classes.container}>
        <Card
          addPost={this.addToLeft}
          posts={this.state.leftPosts}
          removeHandler={this.removeFromLeft}
          sortDir={(dir) => this.changeSortDirection("leftPosts", dir)}
          clearDesk={() => this.clearDesk("leftPosts")}
        />
        <Card
          addPost={this.addToRight}
          posts={this.state.rightPosts}
          removeHandler={this.removeFromRight}
          sortDir={(dir) => this.changeSortDirection("rightPosts", dir)}
          clearDesk={() => this.clearDesk("rightPosts")}
        />
      </div>
    );
  }
}

export default Main;
