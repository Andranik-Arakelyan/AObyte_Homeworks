import React, { Component } from "react";
import Comment from "../Comment/Comment";
import classes from "./OnePost.module.css";
import upSort from "../../assets/upsort.png";
import downSort from "../../assets/downsort.png";
import { ASCENDING, DESCENDING } from "../../constants/text";
import sort from "../../helpers/sort";
import AddComment from "../AddComment/AddComment";
import { deleteComment } from "../../Api/api";

class OnePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDir: DESCENDING,
      comments: sort(props.post.comments, DESCENDING, "rating"),
    };
  }

  refreshComments = (updatedComment) => {
    this.setState({
      comments: sort(
        [...this.state.comments, updatedComment],
        this.state.sortDir,
        "rating"
      ),
    });
  };

  deleteCom = async (postId, commentId) => {
    // const updatedComments = this.state.comments.filter((com) => com.id !== id);
    const updatedComments = await deleteComment(postId, commentId);
    this.setState({ comments: updatedComments.data });
  };

  drawSortDirection = () => {
    return this.state.sortDir === DESCENDING ? (
      <div className={classes.sort}>
        <span>Highest rated</span>
        <img src={upSort} alt="sortDir" onClick={this.changeSortDirection} />
      </div>
    ) : (
      <div className={classes.sort}>
        <span>Lowest rated</span>
        <img src={downSort} alt="sortDir" onClick={this.changeSortDirection} />
      </div>
    );
  };

  changeSortDirection = () => {
    this.setState({
      sortDir: this.state.sortDir === DESCENDING ? ASCENDING : DESCENDING,
      comments: sort(
        this.state.comments,
        this.state.sortDir === DESCENDING ? ASCENDING : DESCENDING,
        "rating"
      ),
    });
  };

  render() {
    const { post } = this.props;
    return (
      <li
        key={post.id}
        className={`${classes.post} ${post.selected ? classes.disabled : ""}`}
      >
        <h3>{post.title}</h3>
        {this.drawSortDirection()}
        <ul className={classes.comments}>
          {this.state.comments.map((com) => {
            return (
              <Comment
                key={com.id}
                comment={com.comment}
                rating={com.rating}
                delete={() => this.deleteCom(post.id, com.id)}
              />
            );
          })}
        </ul>
        <AddComment
          key={post.id}
          id={post.id}
          refreshComs={this.refreshComments}
        />
      </li>
    );
  }
}

export default OnePost;
