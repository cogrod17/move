import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, logout } from "../../actions";

class LogoutModal extends Component {
  render() {
    if (this.props.activeModal !== "logout") return null;
    const { token, logout, closeModal } = this.props;

    return (
      <div className="modal-dimmer">
        <div className="modal-container logout">
          <h1>Logout?</h1>
          <div>
            <p onClick={() => logout(token)}>Logout</p>
            <p onClick={closeModal}>Cancel</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal, logout })(LogoutModal);
