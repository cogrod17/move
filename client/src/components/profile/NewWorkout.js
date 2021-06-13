import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";

class NewWorkout extends Component {
  render() {
    if (this.props.activeModal !== "newworkout") return null;
    return (
      <div className="modal-dimmer">
        <div className="modal-container">
          <p className="close-btn" onClick={this.props.closeModal}>
            X
          </p>
          <h1>New Workout</h1>
          <div className="form-field">
            <input />
            <label>Type</label>
          </div>
          <div className="form-field">
            <input />
            <label>Distance</label>
          </div>
          <div className="form-field">
            <input />
            <label>Time</label>
          </div>
          <div className="form-field">
            <input />
            <label>Description</label>
          </div>
          <p className="form-button">→</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(NewWorkout);
