import React, { useState } from "react";
import { connect } from "react-redux";

const AddComment = () => {
  const [text, setText] = useState();

  const add = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    //newPost(post, token);
    setText("");
  };

  return (
    <form onSubmit={(e) => add(e)} className="comment-input">
      <input
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        value={text}
      />
    </form>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AddComment);
