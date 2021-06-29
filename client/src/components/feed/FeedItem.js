import React from "react";
import { connect } from "react-redux";

const FeedItem = ({ item }) => {
  const { username, date, type, distance, duration, pace, description } = item;

  return (
    <div className="section feed-item">
      <div className="section-container">
        <div className="section-stats two ">
          <p>{username}</p>
          <p>{date}</p>
          <p>{type}</p>
          {type === "cardio" ? (
            <div>
              <p>Distance</p>
              <p>{distance} miles</p>
            </div>
          ) : null}
          <p>{duration} minutes</p>
          {type === "cardio" ? (
            <div>
              <p>Pace</p>
              <p>{pace} m/mile</p>
            </div>
          ) : null}
          <p>{description}</p>
        </div>
        <div className="section-visual"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FeedItem);
