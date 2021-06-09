import React, { Component } from "react";
import { connect } from "react-redux";

class Summary extends Component {
  render() {
    return (
      <div className="summary-container">
        <h1>Summary</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Summary);
