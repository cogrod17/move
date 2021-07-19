import React from "react";
import { connect } from "react-redux";
import { selectChat } from "../../actions";

const ContactList = ({ user, selectChat, activeChat }) => {
  const renderFriends = () => {
    return user.friends.map((friend, i) => {
      return (
        <p onClick={() => selectChat(friend)} key={i}>
          {friend}
        </p>
      );
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

export default connect(mapStateToProps, { selectChat })(ContactList);
