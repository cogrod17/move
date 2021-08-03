import React, { useState } from "react";
import { connect } from "react-redux";
import { server } from "../../api";

const AddComment = ({ getComments, id, token }) => {
  const [text, setText] = useState("");

  const add = async (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    setText("");
    await server.post(`/comments/${id}`, text, {
      headers: { Authorization: `Bearer ${token}`, text },
    });
    getComments();
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
