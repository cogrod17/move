import React from "react";
import { connect } from "react-redux";
import { formatDate, setViewUser } from "../../helperFunctions";

const WorkoutFeed = ({ item, user }) => {
  const { username, date, type, distance, duration, pace, description } = item;

  return (
    <div className="section feed-item">
      <div className="section-container">
        <div className="section-stats two ">
          <p
            className="feed-username"
            onClick={() => setViewUser(item.username, user.username)}
          >
            {username}
          </p>
          <p className="feed-date">{formatDate(date)}</p>
          <div>
            <p>Type</p>
            <p>{type.toUpperCase()}</p>
          </div>
          {type === "cardio" ? (
            <div>
              <p>Distance</p>
              <p>{distance} miles</p>
            </div>
          ) : null}
          <div>
            <p>Duration</p>
            <p>{duration} minutes</p>
          </div>
          {type === "cardio" ? (
            <div>
              <p>Pace</p>
              <p>{pace} m/mile</p>
            </div>
          ) : null}

          <p className="feed-description">{description}</p>
        </div>
        <div className="section-visual"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutFeed);
