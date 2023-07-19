import React, { Component } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { addComment } from "../../Api/api";
import send from "../../assets/send.png";
import classes from "./AddComment.module.css";

class AddComment extends Component {
  state = {
    comment: "",
    ratingValue: 5,
    sending: false,
  };

  addCommentHandler = () => {
    if (this.state.comment !== "") {
      this.setState({ sending: true });
      const newComment = {
        comment: this.state.comment,
        rating: this.state.ratingValue,
      };

      addComment(this.props.id, newComment)
        .then((response) => {
          this.setState({ comment: "", ratingValue: 5, sending: false });
          this.props.refreshComs(response);
        })
        .catch((err) => console.log(err.message));
    }
  };

  render() {
    return (
      <div className={classes.container}>
        <textarea
          value={this.state.comment}
          placeholder="What do you think about this?"
          onChange={(e) => this.setState({ comment: e.target.value })}
        />
        <div>
          <Typography component="legend">Rate this post</Typography>
          <Rating
            name="simple-controlled"
            disabled={this.state.sending}
            value={this.state.ratingValue}
            onChange={(event, newValue) => {
              this.setState({ ratingValue: newValue });
            }}
          />
        </div>
        {this.state.sending ? (
          <CircularProgress />
        ) : (
          <img src={send} alt="send" onClick={this.addCommentHandler} />
        )}
      </div>
    );
  }
}

export default AddComment;
