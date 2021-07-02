import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../../helperFunctions";
import { viewUser } from "../../actions";

const WorkoutFeed = ({ item, viewUser }) => {
  const { username, date, type, distance, duration, pace, description } = item;

  return (
    <div className="section feed-item">
      <div className="section-container">
        <div className="section-stats two ">
          <p className="feed-username" onClick={() => viewUser(item.owner)}>
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

export default connect(mapStateToProps, { viewUser })(WorkoutFeed);