import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, createWorkout } from "../../actions";

class NewWorkout extends Component {
  state = {
    title: "",
    type: "",
    distance: "",
    duration: "",
    description: "",
    file: null,
  };

  onSubmit = async () => {
    const { createWorkout, closeModal } = this.props;
    closeModal();
    await createWorkout(this.state);
  };

  cardioFields = () => {
    if (this.state.type !== "cardio") return null;
    return (
      <div>
        <div className="form-field">
          <input
            type="number"
            onChange={(e) => this.setState({ distance: e.target.value })}
          />
          <label>Distance (miles)</label>
        </div>
      </div>
    );
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
              <select
                id="cars"
                name="cars"
                onChange={(e) => {
                  this.setState({ type: e.target.value });
                }}
              >
                <option value=""></option>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="hiit">HIIT</option>
              </select>
              <label>Type</label>
            </div>
            {this.cardioFields()}
            <div className="form-field">
              <input
                type="number"
                onChange={(e) => this.setState({ duration: e.target.value })}
              />
              <label>Duration (minutes)</label>
            </div>
            <div className="form-field">
              <input
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
              <label>Description</label>
            </div>
            <br />
            <div>
              <h4>Add Image:</h4>
              <input
                onChange={(e) => this.setState({ file: e.target.files[0] })}
                type="file"
                name="file"
              />
            </div>
            <p onClick={this.onSubmit} className="form-button">
              ???
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  closeModal,
  createWorkout,
})(NewWorkout);
