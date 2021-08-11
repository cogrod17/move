import React from "react";
import { connect } from "react-redux";
import SumVis from "./SumVis";

const Summary = ({ viewUser }) => {
  if (!viewUser) return null;

  const { summary } = viewUser;

  return (
    <div className="section">
      <h1>Summary</h1>
      <div className="summary">
        <div className="section-stats two">
          <div>
            <p>Move Days</p>
            <p className="stat">{summary.moveDays}</p>
          </div>

          <div>
            <p>Move Min</p>
            <p className="stat">{summary.moveMin}</p>
          </div>
          <div>
            <p>Cardio Days</p>
            <p className="stat">{summary.cardioDays}</p>
          </div>
          <div>
            <p>Miles Run</p>
            <p className="stat">{`${summary.milesRun} miles`}</p>
          </div>
          <div>
            <p>Avg Pace</p>
            <p className="stat">{`${
              summary.avgPace ? summary.avgPace.toFixed(2) : "-"
            } min/mile`}</p>
          </div>
          <div>
            <p>Strength Days</p>
            <p className="stat">{summary.strengthDays}</p>
          </div>
          <div>
            <p>HIIT Days</p>
            <p className="stat">{summary.hiitDays}</p>
          </div>
        </div>
        <SumVis />
        {/*<div id="section-visual"></div>*/}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Summary);
