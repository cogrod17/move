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
        <h1>Sign Up</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeForm })(SignUp);
