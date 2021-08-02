import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal, logout } from "../../actions";

class LogoutModal extends Component {
  render() {
    const { activeModal } = this.props;
    if (!activeModal || activeModal.type !== "confirm") return null;
    const { closeModal } = this.props;

    const { header, action, args } = activeModal;

    const remove = () => {
      action(`${args ? args : ""}`);
      closeModal();
    };

    return (
      <div className="modal-dimmer">
        <div className="modal-container logout">
          <p className="close-btn" onClick={closeModal}>
            X
          </p>
          <h1>{header}</h1>
          <div>
            <p onClick={remove}>Confirm</p>
            <p onClick={closeModal}>Cancel</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal, logout })(LogoutModal);
