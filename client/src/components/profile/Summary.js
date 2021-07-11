import React from "react";
import { connect } from "react-redux";
import useWindowStatus from "../../hooks/useWindowStatus";

const Summary = ({ viewUser, summary }) => {
  const [windowStatus, getWindowStatus] = useWindowStatus();

  let show;
  windowStatus === "user" ? (show = summary) : (show = viewUser.summary);

  return (
    <div className="section">
      <h1>Summary</h1>
      <div className="section-container">
        <div className="section-stats two">
          <div>
            <p>Move Days</p>
            <p className="stat">{show.moveDays}</p>
          </div>

          <div>
            <p>Move Min</p>
            <p className="stat">{show.moveMin}</p>
          </div>
          <div>
            <p>Cardio Days</p>
            <p className="stat">{show.cardioDays}</p>
          </div>
          <div>
            <p>Miles Run</p>
            <p className="stat">{`${show.milesRun} miles`}</p>
          </div>
          <div>
            <p>Avg Pace</p>
            <p className="stat">{`${
              show.avgPace ? show.avgPace.toFixed(2) : "-"
            } min/mile`}</p>
          </div>
          <div>
            <p>Strength Days</p>
            <p className="stat">{show.strengthDays}</p>
          </div>
          <div>
            <p>HIIT Days</p>
            <p className="stat">{show.hiitDays}</p>
          </div>
        </div>
        <div className="section-visual"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Summary);
