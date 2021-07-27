import React, { useState } from "react";
import { connect } from "react-redux";
import { closeModal, uploadAvatar } from "../../actions";

const EditAvatar = ({ activeModal, closeModal, uploadAvatar }) => {
  const [file, setFile] = useState();
  if (activeModal !== "edit-avatar") return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    await data.append("avatar", file);

    uploadAvatar(data);
    closeModal();
  };

  return (
    <div className="modal-dimmer">
      <div className="modal-container">
        <p className="close-btn" onClick={closeModal}>
          X
        </p>
        <h1>Edit Avatar</h1>
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

export default connect(mapStateToProps, { closeModal, uploadAvatar })(
  EditAvatar
);
