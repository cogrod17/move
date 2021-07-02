import React, { useEffect } from "react";
import { connect } from "react-redux";
import WorkoutFeed from "./WorkoutFeed";
import Post from "./Post";
import InputFeed from "./InputFeed";

import { getFeed } from "../../actions";
import "./feed.css";

const Feed = ({ getFeed, feed, token }) => {
  useEffect(() => {
    if (!token) return;
    getFeed(token);
  }, [getFeed, token]);

  const renderFeed = () => {
    if (!feed) return null;

    return feed.map((item, i) => {
      if (item.type) return <WorkoutFeed item={item} key={i} />;

      if (item.text) return <Post post={item} key={i} />;
    });
  };

  return (
    <div className="feed-container">
      <InputFeed />
      {renderFeed()}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getFeed })(Feed);
