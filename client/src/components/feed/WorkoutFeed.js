import React, { useState } from "react";
import { connect } from "react-redux";
import WorkoutFeedImage from "./WorkoutFeedImage";
import CommentSection from "./CommentSection";
import PostHeader from "./PostHeader";

const WorkoutFeed = ({ item }) => {
  const [hasPic, setHasPic] = useState(true);
  const { type, distance, duration, pace, description } = item;

  return (
    <div className="feed-item">
      <div className={`feed-section ${!hasPic ? null : "pic"}`}>
        <div>
          <PostHeader post={item} />
          <p className="feed-description">{description}</p>
        </div>
        {hasPic && <WorkoutFeedImage workout={item} setHasPic={setHasPic} />}
        <div className="section-stats feed-stats two">
          <div>
            <p>Type</p>
            <p>{type.toUpperCase()}</p>
          </div>
          {type === "cardio" ? (
            <div>
              <p>Distance</p>
              <p>{distance} miles</p>
            </div>
          ) : null}
          <div>
            <p>Duration</p>
            <p>{duration} minutes</p>
          </div>
          {type === "cardio" ? (
            <div>
              <p>Pace</p>
              <p>{pace} m/mile</p>
            </div>
          ) : null}
        </div>
      </div>

      <CommentSection id={item._id} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutFeed);
