import React from "react";
import HeaderBtns from "./HeaderBtns";
import Menu from "./Menu";
import history from "../../history";
import { connect } from "react-redux";

class Header extends React.Component {
  state = { isLoggedIn: false };

  render() {
    return (
      <div className="header-container">
        <div className="title">
          <h1 onClick={() => history.push("/")}>Move</h1>
        </div>
        {this.state.isLoggedIn ? <Menu /> : <HeaderBtns />}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);
