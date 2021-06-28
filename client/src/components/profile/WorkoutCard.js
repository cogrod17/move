import React from "react";
import { connect } from "react-redux";
//import pic from "../../images/miami.jpeg";

const WorkoutCard = ({ workout }) => {
  const pace = () => {
    if (workout.type !== "cardio") return null;
    return (
      <div>
        <p>{`${workout.pace} min/mile`}</p>
      </div>
    );
  };

  const distance = () => {
    if (workout.type !== "cardio") return null;
    return (
      <div>
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
        <p>{workout.date}</p>
      </div>
      <div>
        <p>{workout.type}</p>
      </div>
      {distance()}
      <div>
        <p>{`${workout.duration} minutes`}</p>
      </div>
      {pace()}
      <div>
        <p>{workout.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutCard);
