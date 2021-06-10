import React, { Component } from "react";
import { connect } from "react-redux";
import { closeForm } from "../../actions";

class Login extends Component {
  render() {
    if (this.props.activeForm !== "login") return null;
    return (
      <div className="landing-form-container">
        <p className="close-btn" onClick={this.props.closeForm}>
          X
        </p>
        <h1 className="form-title">Login</h1>
        <form>
          <div className="landing-field">
            <input />
            <label>Username</label>
          </div>
          <div className="landing-field">
            <input type="text" />
            <label>Password</label>
          </div>
          <p className="form-button">→</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeForm })(Login);
