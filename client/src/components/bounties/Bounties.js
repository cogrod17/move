import React, { Component } from "react";
import { connect } from "react-redux";

class Bounties extends Component {
  render() {
    return (
      <div className="bounties-container">
        <h1>Bounties</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Bounties);
