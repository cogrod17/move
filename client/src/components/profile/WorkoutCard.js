import React from "react";
import { connect } from "react-redux";
//import pic from "../../images/miami.jpeg";

const WorkoutCard = ({ workout }) => {
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
      <div>
        <p>{workout.distance}</p>
      </div>
      <div>
        <p>{workout.duration}</p>
      </div>
      <div>
        <p>NEED TO CALCULATE PACE</p>
      </div>
      <div>
        <p>{workout.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutCard);
