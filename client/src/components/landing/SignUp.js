import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, createUser } from "../../actions";
//import { server } from "../../api";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  onCreate = () => {
    this.props.createUser(
      this.state.username,
      this.state.email,
      this.state.password
    );
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
            />
            <label>Password</label>
          </div>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ confirmPass: e.target.value })}
            />
            <label>Confirm Password</label>
          </div>
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
