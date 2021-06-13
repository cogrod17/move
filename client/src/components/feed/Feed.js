import React, { Component } from "react";
import { connect } from "react-redux";
import FeedItem from "./FeedItem";
import InputFeed from "./InputFeed";
import "./feed.css";

class Feed extends Component {
  render() {
    return (
      <div className="feed-container">
        <InputFeed />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Feed);
