import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, login } from "../../actions";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  render() {
    if (this.props.activeModal !== "login") return null;
    const { closeModal, login } = this.props;

    return (
      <div className="modal-container">
        <p className="close-btn" onClick={closeModal}>
          X
        </p>
        <h1 className="form-title">Login</h1>
        <form>
          <div className="form-field">
            <input onChange={(e) => this.setState({ email: e.target.value })} />
            <label>Email</label>
          </div>
          <div className="form-field">
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              type="text"
            />
            <label>Password</label>
          </div>
          <p
            className="form-button"
            onClick={() => login(this.state.email, this.state.password)}
          >
            →
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  closeModal,
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
