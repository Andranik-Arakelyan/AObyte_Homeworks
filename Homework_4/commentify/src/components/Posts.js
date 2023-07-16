import React, { Component } from "react";
import classes from "./Posts.module.css";
import Comment from "./Comment";

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
      return (
        <li
          key={post.id}
          className={`${classes.post} ${post.selected ? classes.disabled : ""}`}
        >
          <h3>{post.title}</h3>
          <ul className={classes.comments}>
            {post.comments.map((com) => {
              return (
                <Comment
                  key={com.id}
                  comment={com.comment}
                  rating={com.rating}
                />
              );
            })}
          </ul>
        </li>
      );
    });
  };

  drawPageNumbers = (n) => {
    const pages = [];
    for (let i = 0; i < n; i++) {
      pages.push(
        <span
          className={`${classes.pageNumber} ${
            this.state.currentPage === i + 1 ? classes.selectedPage : ""
          }`}
          key={i}
          onClick={() => this.changePage(i + 1)}
        >
          {i + 1}
        </span>
      );
    }
    return pages;
  };

  changePage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
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
        {this.drawPageNumbers(totalPages)}
      </section>
    );
  }
}

export default Posts;
