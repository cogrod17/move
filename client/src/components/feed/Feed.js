import React, { useEffect } from "react";
import { connect } from "react-redux";
import FeedItem from "./FeedItem";
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
      return <FeedItem item={item} key={i} />;
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
