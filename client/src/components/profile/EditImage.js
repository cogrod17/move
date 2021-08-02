import React, { useState } from "react";
import { connect } from "react-redux";
import { closeModal, uploadAvatar, editWorkoutImage } from "../../actions";

const EditImage = (props) => {
  const { activeModal, closeModal, uploadAvatar, editWorkoutImage } = props;
  const [file, setFile] = useState();

  if (
    !activeModal ||
    activeModal.type ||
    (activeModal !== "edit-avatar" &&
      activeModal.slice(0, 16) !== "edit-workout-img")
  )
    return null;

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);

    if (activeModal === "edit-avatar") uploadAvatar(data);
    if (activeModal.slice(0, 16) === "edit-workout-img") {
      const workout_id = activeModal.substring(17);
      editWorkoutImage(data, workout_id);
    }

    closeModal();
  };

  return (
    <div className="modal-dimmer">
      <div className="modal-container">
        <p className="close-btn" onClick={closeModal}>
          X
        </p>
        <h1>Edit Image</h1>
        <form className="avatar-form">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="file"
          />
          <button onClick={(e) => onSubmit(e)}>Upload</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  closeModal,
  uploadAvatar,
  editWorkoutImage,
})(EditImage);
