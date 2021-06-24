import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, createWorkout } from "../../actions";

class NewWorkout extends Component {
  state = {
    title: "",
    date: "",
    type: "",
    distance: "",
    duration: "",
    description: "",
  };

  onSubmit = async () => {
    await this.props.createWorkout(this.state);
    this.props.closeModal();
  };

  render() {
    if (this.props.activeModal !== "newworkout") return null;
    return (
      <div className="modal-dimmer">
        <div className="modal-container">
          <p className="close-btn" onClick={this.props.closeModal}>
            X
          </p>
          <h1>New Workout</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-field">
              <input
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <label>Title</label>
            </div>
            <div className="form-field">
              <input
                onChange={(e) => this.setState({ date: e.target.value })}
              />
              <label>Date</label>
            </div>
            <div className="form-field">
              <input
                onChange={(e) => this.setState({ type: e.target.value })}
              />
              <label>Type</label>
            </div>
            <div className="form-field">
              <input
                onChange={(e) => this.setState({ distance: e.target.value })}
              />
              <label>Distance</label>
            </div>
            <div className="form-field">
              <input
                onChange={(e) => this.setState({ duration: e.target.value })}
              />
              <label>Duration</label>
            </div>
            <div className="form-field">
              <input
                onChange={(e) => this.setState({ description: e.target.value })}
              />
              <label>Description</label>
            </div>
            <p onClick={this.onSubmit} className="form-button">
              →
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal, createWorkout })(
  NewWorkout
);
