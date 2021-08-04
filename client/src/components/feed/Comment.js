import React from "react";
import history from "../../history";
import { formatDate } from "../../helperFunctions";

const Comment = ({ data }) => {
  return (
    <div className="comment">
      <h4 onClick={() => history.push(`/profile/${data.author}`)}>
        {data.author}
      </h4>
      <div>
        <p className="comment-body">{data.text}</p>
        <p className="comment-date">{formatDate(data.date)}</p>
      </div>
    </div>
  );
};

export default Comment;
