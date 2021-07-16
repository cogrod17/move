import React, { useEffect } from "react";
import { connect } from "react-redux";
//import useInfo from "../../hooks/useUser";

const Summary = ({ viewUser }) => {
  //const [info, getInfo] = useInfo(summary);

  // useEffect(() => {
  //   if (!viewUser) return;
  //   getInfo(summary, viewUser.summary);
  // }, [getInfo, summary, viewUser]);

  if (!viewUser) return null; /// NEED A LOADER

  const { summary } = viewUser;

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
        <div className="section-visual"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Summary);
