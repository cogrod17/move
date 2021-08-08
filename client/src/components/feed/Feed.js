import React, { useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import WorkoutFeed from "./WorkoutFeed";
import Post from "./Post";
import InputFeed from "./InputFeed";
import Filter from "./Filter";
import Loader from "../misc./Loader";
import { getFeed } from "../../actions";
import "./feed.css";

const Feed = ({ getFeed, feed, token, user }) => {
  const observer = useRef();

  useEffect(() => {
    if (!token || !feed.hasMore) return;
    getFeed();
  }, [feed.hasMore, getFeed, token]);

  const lastElRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getFeed();
        }
      });

      if (node) observer.current.observe(node);
    },
    [getFeed]
  );

  const renderFeed = () => {
    if (!feed.items) return <Loader />;

    return feed.items.map((item, i) => {
      if (feed.filter !== "Everyone") {
        if (
          !user.friends.includes(item.username) &&
          item.username !== user.username
        )
          return null;
      }
      return item.text ? (
        <Post
          post={item}
          key={i}
          innerRef={i === feed.items.length - 1 ? lastElRef : null}
        />
      ) : (
        <WorkoutFeed
          item={item}
          key={i}
          innerRef={i === feed.items.length - 1 ? lastElRef : null}
        />
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
