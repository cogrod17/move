import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteWorkout, openModal } from "../../actions";
import strengthPic from "../../images/strength.jpg";
import cardioPic from "../../images/cardio.jpg";

const WorkoutImage = (props) => {
  const { workout, viewUser, user, openModal, deleteWorkout } = props;
  const [pic, setPic] = useState(
    `http://localhost:3001/workout/image/${workout._id}`
  );
  const [picLoading, setPicLoading] = useState(true);
  const { username } = viewUser.user;

  const setDefaultPic = () => {
    if (
      workout.type.toLowerCase() === "strength" ||
      workout.type.toLowerCase() === "hiit"
    )
      setPic(strengthPic);
    if (workout.type.toLowerCase() === "cardio") setPic(cardioPic);
  };

  return (
    <div
      className={`workout-visual ${username === user.username ? "edit" : ""}`}
    >
      <div>
        <p onClick={() => openModal(`edit-workout-img:${workout._id}`)}>Edit</p>
        <p
          onClick={() =>
            openModal({
              type: "confirm",
              action: deleteWorkout,
              args: workout._id,
              header: "Delete Workout?",
            })
          }
          className="delete"
        >
          Delete
        </p>
      </div>
      <img
        src={pic}
        alt={"workout-card"}
        className={`smooth-image image-${!picLoading ? "visible" : "hidden"}`}
        onLoad={() => setPicLoading(false)}
        onError={() => {
          setDefaultPic();
          setPicLoading(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { deleteWorkout, openModal })(
  WorkoutImage
);
