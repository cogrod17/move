import React, { useEffect } from "react";
import { connect } from "react-redux";
import WorkoutFeed from "./WorkoutFeed";
import Post from "./Post";
import InputFeed from "./InputFeed";
import Filter from "./Filter";
import Loader from "../misc./Loader";
import { getFeed } from "../../actions";
import "./feed.css";

const Feed = ({ getFeed, feed, token, user }) => {
  useEffect(() => {
    getFeed(token);
  }, [getFeed, token]);

  const renderFeed = () => {
    if (!feed.items) return <Loader />;

    return feed.items.map((item, i) => {
      // if (user.friends.includes(item.username))
      if (feed.filter !== "Everyone") {
        if (
          !user.friends.includes(item.username) &&
          item.username !== user.username
        )
          return;
      }

      return item.text ? (
        <Post post={item} key={i} />
      ) : (
        <WorkoutFeed item={item} key={i} />
      );
    });
  };

  return (
    <div className="feed-container">
      <Filter />
      <InputFeed />
      {renderFeed()}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getFeed })(Feed);
