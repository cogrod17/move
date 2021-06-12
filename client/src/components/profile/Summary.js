import React, { Component } from "react";
import { connect } from "react-redux";

class Summary extends Component {
  render() {
    return (
      <div className="profile-section">
        <h1>Summary</h1>
        <div className="section-container">
          <div className="section-stats two">
            <div>
              <p>Move Days</p>
              <p className="stat">17</p>
            </div>
            <div>
              <p>Cardio Days</p>
              <p className="stat">17</p>
            </div>
            <div>
              <p>Miles Run</p>
              <p className="stat">1,000</p>
            </div>
            <div>
              <p>Avg Pace</p>
              <p className="stat">7:00 min/mile</p>
            </div>
            <div>
              <p>Strength Days</p>
              <p className="stat">17</p>
            </div>
            <div>
              <p>HIIT Days</p>
              <p className="stat">17</p>
            </div>
          </div>
          <div className="section-visual">
            <div className="graph"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Summary);
