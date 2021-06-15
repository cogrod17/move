import React, { Component } from "react";
import { connect } from "react-redux";

class ContactList extends Component {
  render() {
    return (
      <div className=" contacts">
        <h1>Friends</h1>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
        <p>Name</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ContactList);
