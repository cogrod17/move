import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../../helperFunctions";
import history from "../../history";

const WorkoutFeed = ({ item }) => {
  const { username, date, type, distance, duration, pace, description } = item;

  return (
    <div className="feed-item">
      <div className="feed-section">
        <div className="section-stats two">
          <p
            className="feed-username"
            onClick={() => history.push(`/profile/${username}`)}
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
        <div className="feed-visual">
          <img
            src={`http://localhost:3001/workout/image/${item._id}`}
            alt={"workout-image"}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutFeed);
