import React, { Component } from "react";
import { connect } from "react-redux";
import pic from "../../images/Uphill.jpeg";

class WorkoutItem extends Component {
  render() {
    return (
      <div className="section-item">
        <div className="item one">
          <div>
            <p className="item-title">TITLE BITCH</p>
          </div>
          <div>
            <p>January 17, 1997</p>
          </div>
          <div>
            <p>Cardio</p>
          </div>
          <div>
            <p>12 Miles (if run)</p>
          </div>
          <div>
            <p>45 minutes (if run)</p>
          </div>
          <div>
            <p>7:00 per mile (if run)</p>
          </div>
          <div>
            <p>Ran around the lake, lots of traffic blah blah blah</p>
          </div>
        </div>
        <div className="section-visual">
          <img src={pic} alt="uploaded" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutItem);
