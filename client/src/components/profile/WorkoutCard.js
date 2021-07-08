import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../../helperFunctions";

const WorkoutCard = ({ workout }) => {
  const pace = () => {
    if (workout.type !== "cardio") return null;
    return (
      <div>
        <p>Pace:</p>
        <p>{`${workout.pace} min/mile`}</p>
      </div>
    );
  };

  const distance = () => {
    if (workout.type !== "cardio") return null;
    return (
      <div>
        <p>Distance:</p>
        <p>{`${workout.distance} miles`}</p>
      </div>
    );
  };

  return (
    <div className="workout-card">
      <div>
        <p className="item-title">{workout.title}</p>
      </div>
      <div>
        <p className="feed-date">{formatDate(workout.date)}</p>
      </div>
      <div className="stats">
        <div>
          <p>Type:</p>
          <p>{workout.type.toUpperCase()}</p>
        </div>
        {distance()}
        <div>
          <p>Duration:</p>
          <p>{`${workout.duration} minutes`}</p>
        </div>
        {pace()}
        <div>
          <p>{workout.description}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutCard);
