import React, { useState } from "react";
import { connect } from "react-redux";
import { filterFeed } from "../../actions";

const Filter = ({ filterFeed, feed }) => {
  const [isOpen, setIsOpen] = useState(false);

  //everyone
  //posts
  //workouts
  //friends

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="filter">
      <h4>Filter:</h4>
      {!isOpen && <p>{feed.filter}</p>}
      {isOpen && (
        <div className="filter-dropdown">
          <ul>
            <p onClick={() => filterFeed("None")}>None</p>
            <p onClick={() => filterFeed("Friends")}>Friends</p>
            <p onClick={() => filterFeed("Workouts")}>Workouts</p>
            <p onClick={() => filterFeed("Posts")}>Posts</p>
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { filterFeed })(Filter);
