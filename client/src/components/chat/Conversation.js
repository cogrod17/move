import React, { Component } from "react";
import { connect } from "react-redux";

class Conversation extends Component {
  render() {
    return (
      <div className="conversation">
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
        <p className="received">Hello</p>
        <p className="sent">Hello</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Conversation);
