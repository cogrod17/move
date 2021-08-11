import React from "react";
import { connect } from "react-redux";
import CommentSection from "./CommentSection";
import PostHeader from "./PostHeader";

const Post = ({ post, innerRef }) => {
  return (
    <div ref={innerRef ? innerRef : null} className="feed-item post">
      <div className="section-container">
        <div>
          <PostHeader post={post} />
          <p className="feed-description">{post.text}</p>
        </div>
      </div>
      <CommentSection id={post._id} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Post);
