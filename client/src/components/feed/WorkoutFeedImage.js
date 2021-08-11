import React, { useState } from "react";
import { connect } from "react-redux";
import Loader from "../misc./Loader";

const WorkoutFeedImage = ({ workout, setHasPic }) => {
  const [picLoading, setPicLoading] = useState(true);

  return (
    <div className="workout-image">
      {picLoading && <Loader />}
      <img
        src={`${window.location.origin}/workout/image/${workout._id}`}
        alt={"workout"}
        className={`smooth-image image-${!picLoading ? "visible" : "hidden"}`}
        onLoad={() => setPicLoading(false)}
        onError={() => {
          setPicLoading(false);
          setHasPic(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutFeedImage);
