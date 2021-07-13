import React from "react";
import { connect } from "react-redux";

const ContactList = ({ user }) => {
  const renderFriends = () => {
    return user.friends.map((friend, i) => {
      return <p key={i}>{friend}</p>;
    });
  };

  return (
    <div className=" contacts">
      <h1>Friends</h1>
      {renderFriends()}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ContactList);
