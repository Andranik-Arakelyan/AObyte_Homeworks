import React, { Component } from "react";
import { Header, Posts, Panel } from "../../components";
import calculateAverages from "../../helpers/average";
import { DUMMY_LIST } from "../../constants/posts";

class Main extends Component {
  constructor(props) {
    super(props);
    this.pool = calculateAverages(DUMMY_LIST);
    this.state = {
      allPosts: [...this.pool],
    };
  }

  disableEnablePost = (id, status) => {
    this.setState((prevState) => {
      const index = this.state.allPosts.findIndex((post) => id === post.id);
      const newPosts = [...prevState.allPosts];
      newPosts[index] = {
        ...newPosts[index],
        selected: status,
      };
      return { ...prevState, allPosts: newPosts };
    });
  };

  filterBySearch = (value) => {
    const comIncludes = (coms, value) => {
      for (let i = 0; i < coms.length; i++) {
        if (coms[i].comment.toLowerCase().includes(value.toLowerCase())) {
          return true;
        }
      }
      return false;
    };
    const filteredPosts = this.pool.filter((post) => {
      return comIncludes(post.comments, value);
    });
    this.setState({ allPosts: filteredPosts });
  };

  render() {
    return (
      <>
        <Header filter={this.filterBySearch} />
        <Posts posts={this.state.allPosts} />
        <Panel posts={this.pool} changeStatus={this.disableEnablePost} />
      </>
    );
  }
}

export default Main;
