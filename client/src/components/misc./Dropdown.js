import React from "react";
import { connect } from "react-redux";
import history from "../../history";

class Dropdown extends React.Component {
  render() {
    if (!this.props.isDropdownOpen) return null;
    return (
      <div className="dropdown">
        <p onClick={() => history.push("/feed")}>Feed</p>
        <p onClick={() => history.push("/chat")}>Chat</p>
        <p onClick={() => history.push("/profile")}>Profile</p>
        <p onClick={() => history.push("/bounties")}>Bounty</p>
        <p>Logout</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dropdown);
