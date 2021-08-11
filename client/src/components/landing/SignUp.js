import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, createUser } from "../../actions";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    error: null,
  };

  onCreate = () => {
    const { username, email, password, confirmPassword } = this.state;
    if (username.includes(" ") || username.length >= 12) {
      this.setState({
        error:
          "username cannot have spaces and must be less than 12 characters",
      });
      return;
    }

    if (password !== confirmPass) {
      this.setState({ error: "passwords do not match" });
      return;
    }

    this.props.createUser(username, email, password);
  };

  render() {
    if (this.props.activeModal !== "signup") return null;
    return (
      <div className="modal-container">
        <p className="close-btn" onClick={this.props.closeModal}>
          X
        </p>
        <h1 className="form-title">Sign Up</h1>
        <form>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <label>Username</label>
          </div>
          <div className="form-field">
            <input onChange={(e) => this.setState({ email: e.target.value })} />
            <label>Email</label>
          </div>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
            />
            <label>Password</label>
          </div>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ confirmPass: e.target.value })}
              type="password"
            />
            <label>Confirm Password</label>
          </div>
          {this.state.error && (
            <div className="error-msg">{this.state.error}</div>
          )}
          <p className="form-button" onClick={this.onCreate}>
            →
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal, createUser })(SignUp);
