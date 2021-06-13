import React, { Component } from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { openModal } from "../../actions";

class WorkoutsHistory extends Component {
  render() {
    return (
      <div className="history-container">
        <h1 onClick={() => this.props.openModal("newworkout")}>+</h1>
        <div className="history-list">
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(WorkoutsHistory);
