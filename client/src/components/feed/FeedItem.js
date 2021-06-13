import React, { Component } from "react";
import { connect } from "react-redux";

class FeedItem extends Component {
  render() {
    return (
      <div className="section feed-item">
        <div className="section-container">
          <div className="section-stats two ">
            <p>Username</p>
            <p>Date</p>
            <p>Type</p>
            <div>
              <p>Distance</p>
              <p>5 miles</p>
            </div>
            <div>
              <p>Pace</p>
              <p>8:30 m/mile</p>
            </div>
            <p>Description</p>
          </div>
          <div className="section-visual"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FeedItem);
