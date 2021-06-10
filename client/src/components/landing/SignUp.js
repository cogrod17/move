import React, { Component } from "react";
import { connect } from "react-redux";
import { closeForm } from "../../actions";

class SignUp extends Component {
  render() {
    if (this.props.activeForm !== "signup") return null;
    return (
      <div className="landing-form-container">
        <p className="close-btn" onClick={this.props.closeForm}>
          X
        </p>
        <h1 className="form-title">Sign Up</h1>
        <form>
          <div className="landing-field">
            <input />
            <label>Username</label>
          </div>
          <div className="landing-field">
            <input />
            <label>Email</label>
          </div>
          <div className="landing-field">
            <input />
            <label>Password</label>
          </div>
          <div className="landing-field">
            <input />
            <label>Confirm Password</label>
          </div>
          <p className="form-button">→</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeForm })(SignUp);
