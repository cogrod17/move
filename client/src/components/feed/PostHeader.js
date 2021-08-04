import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { formatDate } from "../../helperFunctions";
import history from "../../history";

const PostHeader = ({ post }) => {
  const [hasPic, setHasPic] = useState(false);
  const { date, username } = post;

  const go = () => {
    history.push(`/profile/${username}`);
  };

  return (
    <Fragment>
      <div className="post-user">
        <div onClick={go} className="post-avatar">
          <img
            src={`http://localhost:3001/profile/avatar/${username}`}
            alt={"avatar"}
            className={`smooth-image image-${hasPic ? "visible" : "hidden"}`}
            onLoad={() => setHasPic(true)}
          />
        </div>
        <div className="username-date">
          <p onClick={go} className="feed-username">
            {username}
          </p>
          <p className="feed-date">{formatDate(date)}</p>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(PostHeader);
