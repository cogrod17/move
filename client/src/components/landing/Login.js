import React, { Component } from "react";
import { connect } from "react-redux";
import { closeForm } from "../../actions";

class Login extends Component {
  render() {
    if (this.props.activeForm !== "login") return null;
    return (
      <div className="landing-form-container login">
        <p className="close-btn" onClick={this.props.closeForm}>
          X
        </p>
        <h1>Login</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeForm })(Login);
