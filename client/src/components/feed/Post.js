import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../../helperFunctions";
import history from "../../history";

const Post = ({ post, user }) => {
  const { date, text, username } = post;

  return (
    <div className="section post">
      <div className="section-container">
        <div className="section-stats">
          <div>
            <p
              onClick={() => history.push(`/profile/${username}`)}
              className="feed-username"
            >
              {username}
            </p>
            <p className="feed-date">{formatDate(date)}</p>
          </div>
          <p className="feed-description">{text}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Post);
