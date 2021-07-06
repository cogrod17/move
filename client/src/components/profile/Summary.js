import React from "react";
import { connect } from "react-redux";
import { getSummary } from "../../actions";

const Summary = ({ info }) => {
  if (!info) return <div className="section">Loading</div>;

  return (
    <div className="section">
      <h1>Summary</h1>
      <div className="section-container">
        <div className="section-stats two">
          <div>
            <p>Move Days</p>
            <p className="stat">{info.moveDays}</p>
          </div>

          <div>
            <p>Move Min</p>
            <p className="stat">{info.moveMin}</p>
          </div>
          <div>
            <p>Cardio Days</p>
            <p className="stat">{info.cardioDays}</p>
          </div>
          <div>
            <p>Miles Run</p>
            <p className="stat">{`${info.milesRun} miles`}</p>
          </div>
          <div>
            <p>Avg Pace</p>
            <p className="stat">{`${
              info.avgPace ? info.avgPace.toFixed(2) : "-"
            } min/mile`}</p>
          </div>
          <div>
            <p>Strength Days</p>
            <p className="stat">{info.strengthDays}</p>
          </div>
          <div>
            <p>HIIT Days</p>
            <p className="stat">{info.hiitDays}</p>
          </div>
        </div>
        <div className="section-visual"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getSummary })(Summary);
