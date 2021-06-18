import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    if (this.props.activeModal !== "login") return null;
    return (
      <div className="modal-container">
        <p className="close-btn" onClick={this.props.closeModal}>
          X
        </p>
        <h1 className="form-title">Login</h1>
        <form>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <label>Username</label>
          </div>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              t
              type="text"
            />
            <label>Password</label>
          </div>
          <p className="form-button">→</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(Login);
