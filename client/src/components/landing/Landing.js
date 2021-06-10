import React, { Component } from "react";
import pic from "../../images/Uphill.jpeg";
import Login from "./Login";
import SignUp from "./SignUp";
import "./landingStyles.css";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    let quote = this.props.activeForm ? null : (
      <p className="landing-quote">What's your excuse?</p>
    );

    return (
      <div className="landing">
        {quote}
        <div className="landing-img-container">
          <img className="landing-img" src={pic} alt="landing-pic" />
        </div>
        <Login />
        <SignUp />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Landing);
