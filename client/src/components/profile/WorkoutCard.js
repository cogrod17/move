import React, { Component } from "react";
import { connect } from "react-redux";
import pic from "../../images/miami.jpeg";

class WorkoutCard extends Component {
  render() {
    return (
      <div className="workout-card">
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
          <p>
            Ran around the lake,asdfasdfasdfasdfasdfasdfasd lots of traffic blah
            bl
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutCard);
