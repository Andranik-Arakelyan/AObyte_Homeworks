import React, { Component } from "react";

import { Post } from "../../components";
import Pagination from "@mui/material/Pagination";

import classes from "./Posts.module.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.postEachPage = 3;
    this.state = {
      currentPage: 1,
    };
  }

  drawPosts = (posts) => {
    return posts.map((post) => {
      return <Post key={post.id} post={post} id={post.id} />;
    });
  };

  drawPageNumbers = (n) => {
    return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={n}
        page={this.state.currentPage}
        onChange={this.changePage}
      />
    );
  };

  changePage = (e, pageNumber) => {
    if (pageNumber !== this.state.currentPage) {
      this.setState({
        currentPage: pageNumber,
      });
    }
  };

  render() {
    const totalPages = Math.ceil(this.props.posts.length / this.postEachPage);
    const showedPosts = this.props.posts.slice(
      (this.state.currentPage - 1) * this.postEachPage,
      this.state.currentPage * this.postEachPage
    );
    return (
      <section className={classes.container}>
        <ul className={classes.posts}>{this.drawPosts(showedPosts)}</ul>
        <ul style={{ marginTop: "40px" }}>
          {this.drawPageNumbers(totalPages)}
        </ul>
      </section>
    );
  }
}

export default Posts;
