import React from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import AddComment from "./AddComment";

const CommentSection = () => {
  return (
    <div className="comments-container">
      <AddComment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CommentSection);
