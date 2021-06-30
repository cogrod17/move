import React, { useState } from "react";
import { connect } from "react-redux";

const InputFeed = () => {
  const [post, setPost] = useState("");

  const submitPost = (e) => {
    e.preventDefault();
    if (post.length === 0) return;
    console.log(post);
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

export default connect(mapStateToProps)(InputFeed);
