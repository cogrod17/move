import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  closeModal,
  updateUser,
  openModal,
  deleteProfile,
} from "../../actions";

const EditProfile = (props) => {
  const [edit, setEdit] = useState({ error: null });
  const [toUpdate, setToUpdate] = useState([]);
  const {
    activeModal,
    closeModal,
    user,
    updateUser,
    openModal,
    deleteProfile,
  } = props;

  useEffect(() => {
    return () => {
      setEdit({ error: null });
      setToUpdate([]);
    };
  }, []);

  if (activeModal !== "edit-account") return null;

  const willUpdate = (field) => {
    if (!toUpdate.includes(field)) setToUpdate([...toUpdate, field]);
  };

  const onSubmit = () => {
    let final = {};
    if (edit.password !== edit.confirmPassword) {
      setEdit({ ...edit, error: "passwords don't match" });
      return;
    }

    toUpdate.forEach((x, i) => {
      if (edit[x] !== "") final[toUpdate[i]] = edit[x];
    });

    updateUser(final);
  };

  const onDelete = () => {
    openModal({
      type: "confirm",
      header: "Delete Account?",
      action: deleteProfile,
    });
  };

  return (
    <div className="modal-dimmer">
      <div className="modal-container">
        <p onClick={closeModal} className="close-btn">
          X
        </p>
        <h1>Edit Account</h1>
        <form>
          <div className="form-field">
            <input
              onChange={(e) => {
                willUpdate("email");
                setEdit({ ...edit, email: e.target.value });
              }}
              type="text"
              placeholder={user.email}
            />
            <label>Email</label>
          </div>
          <div className="form-field">
            <input
              onChange={(e) => {
                willUpdate("password");
                setEdit({ ...edit, password: e.target.value });
              }}
              type="password"
              placeholder="******"
            />
            <label>Password</label>
          </div>
          {toUpdate.includes("password") && (
            <div className="form-field">
              <input
                onChange={(e) =>
                  setEdit({ ...edit, confirmPassword: e.target.value })
                }
                type="password"
                placeholder="******"
              />
              <label>Confirm Password</label>
            </div>
          )}
          <p onClick={onSubmit} className="form-button">
            →
          </p>
          {edit.error && <div className="error-msg">{edit.error}</div>}
          <p onClick={onDelete} className="delete-btn">
            Delete Account
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  closeModal,
  updateUser,
  openModal,
  deleteProfile,
})(EditProfile);
