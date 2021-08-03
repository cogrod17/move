import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { server } from "../../api";

const CommentSection = ({ id }) => {
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    try {
      const res = await server.get(`/comments/${id}`);
      setComments(res.data);
    } catch (e) {
      setComments("error");
    }
  });

  // useEffect(() => {
  //   getComments();
  //   if (id === "61064dd7a5461949b4f69951") console.log("running");
  // }, []);

  const renderComments = () => {
    getComments();
    if (comments === "error") return <div>There was an error</div>;
    if (!comments.length) return <p>There are no comments yet</p>;

    return comments.map((c, i) => {
      return <Comment key={i} data={c} />;
    });
  };

  return (
    <div>
      <h3 className="comment-tag">Comments</h3>
      <div className="comments-container">{renderComments()}</div>
      <AddComment getComments={getComments} id={id} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CommentSection);
