import React, { useState } from "react";
import { connect } from "react-redux";
import { newPost } from "../../actions";

const InputFeed = ({ newPost, token }) => {
  const [post, setPost] = useState("");

  const submitPost = (e) => {
    e.preventDefault();
    if (post.length === 0) return;
    newPost(post, token);
    setPost("");
  };

  return (
    <form onSubmit={(e) => submitPost(e)} className="input-feed">
      <input
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's your motivation?"
        value={post}
      />
    </form>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { newPost })(InputFeed);
