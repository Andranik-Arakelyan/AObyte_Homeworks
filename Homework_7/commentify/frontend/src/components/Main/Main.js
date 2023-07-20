import React, { Component } from "react";

import { Header, Posts, Panel } from "../../components";

import { fetchPosts } from "../../Api/api";
import { calculateAverages } from "../../helpers";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pool: [],
      allPosts: [],
      searchedNotFound: false,
    };
  }

  componentDidMount() {
    fetchPosts()
      .then((response) =>
        this.setState({
          loading: false,
          allPosts: calculateAverages(response.data),
          pool: calculateAverages(response.data),
        })
      )
      .catch((error) => console.error("Error fetching posts:", error));
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
        return coms[i].comment.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    };

    const filteredPosts = this.state.pool.filter((post) => {
      return comIncludes(post.comments, value);
    });

    if (!filteredPosts.length) {
      this.setState({ searchedNotFound: true });
    } else {
      this.setState({ allPosts: filteredPosts, searchedNotFound: false });
    }
  };

  render() {
    return (
      <>
        <Header filter={this.filterBySearch} posts={this.state.pool} />
        {!this.state.loading && (
          <>
            {this.state.searchedNotFound ? (
              <p>Nothing found</p>
            ) : (
              <Posts posts={this.state.allPosts} />
            )}
            <Panel
              posts={this.state.pool}
              changeStatus={this.disableEnablePost}
            />
          </>
        )}
      </>
    );
  }
}

export default Main;
