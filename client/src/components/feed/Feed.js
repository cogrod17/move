import React, { useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import WorkoutFeed from "./WorkoutFeed";
import Post from "./Post";
import InputFeed from "./InputFeed";
import Filter from "./Filter";
import Loader from "../misc./Loader";
import { getFeed } from "../../actions";
import "./feed.css";

const Feed = ({ getFeed, feed, token }) => {
  const observer = useRef();

  useEffect(() => {
    if (!token || !feed.hasMore) return;
    getFeed();
  }, [feed.hasMore, getFeed, token, feed.filter]);

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

  //in order to filter the feed we will need to rerender it
  const renderFeed = () => {
    if (!feed.items) return <Loader />;

    return feed.items.map((item, i) => {
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
