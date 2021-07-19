import React, { useEffect } from "react";
import { connect } from "react-redux";
import WorkoutFeed from "./WorkoutFeed";
import Post from "./Post";
import InputFeed from "./InputFeed";
import { getFeed } from "../../actions";
import "./feed.css";

const Feed = ({ getFeed, feed, token }) => {
  useEffect(() => {
    getFeed(token);
  }, [getFeed, token]);

  const renderFeed = () => {
    if (!feed) return null;

    return feed.map((item, i) => {
      return item.text ? (
        <Post post={item} key={i} />
      ) : (
        <WorkoutFeed item={item} key={i} />
      );
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
