import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { server } from "../../api";

const CommentSection = ({ id }) => {
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    try {
      const { data } = await server.get(`/comments/${id}`);
      setComments(data);
    } catch (e) {
      setComments("error");
    }
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const renderComments = () => {
    if (!comments) return;
    if (comments === "error") return <div>There was an error</div>;
    if (!comments.length) return null;

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
