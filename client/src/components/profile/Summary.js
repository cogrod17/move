import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSummary } from "../../actions";

const Summary = ({ getSummary, token, summary }) => {
  useEffect(() => {
    if (!token) return;
    getSummary(token);
  }, [getSummary, token]);

  return (
    <div className="section">
      <h1>Summary</h1>
      <div className="section-container">
        <div className="section-stats two">
          <div>
            <p>Move Days</p>
            <p className="stat">{summary.moveDays}</p>
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
            <p className="stat">{`${summary.avgPace} min/mile`}</p>
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
        <div className="section-visual"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getSummary })(Summary);
