import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";

class LogoutModal extends Component {
  render() {
    if (this.props.activeModal !== "logout") return null;
    return (
      <div className="modal-dimmer">
        <div className="modal-container logout">
          <h1>Logout?</h1>
          <div>
            <p>Logout</p>
            <p onClick={this.props.closeModal}>Cancel</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(LogoutModal);
