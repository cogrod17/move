import React from "react";
import { formatDate } from "../../helperFunctions";

const Post = ({ post }) => {
  const { date, text, username } = post;

  return (
    <div className="section post">
      <div className="section-container">
        <div className="section-stats">
          <div>
            <p className="feed-username">{username}</p>
            <p className="feed-date">{formatDate(date)}</p>
          </div>
          <p className="feed-description">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
