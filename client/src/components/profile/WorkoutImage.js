import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteWorkout, openModal } from "../../actions";
import Loader from "../misc./Loader";

const WorkoutImage = (props) => {
  const { workout, viewUser, user, openModal, deleteWorkout } = props;

  const [hasPic, setHasPic] = useState(true);
  const [picLoading, setPicLoading] = useState(true);
  const { username } = viewUser.user;

  return (
    <div
      className={`workout-visual ${username === user.username ? "edit" : ""}`}
    >
      <div className={`${username === user.username ? "card-btns" : "hidden"}`}>
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
      {picLoading && <Loader />}
      {hasPic ? (
        <img
          src={`http://localhost:3001/workout/image/${workout._id}`}
          alt={"workout-card"}
          className={`smooth-image image-${!picLoading ? "visible" : "hidden"}`}
          onLoad={() => {
            setHasPic(true);
            setPicLoading(false);
          }}
          onError={() => {
            setHasPic(false);
            setPicLoading(false);
          }}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { deleteWorkout, openModal })(
  WorkoutImage
);
