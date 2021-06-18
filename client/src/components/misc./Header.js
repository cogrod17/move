import React from "react";
import HeaderBtns from "./HeaderBtns";
import Menu from "./Menu";
import history from "../../history";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <div className="title">
          <h1 onClick={() => history.push("/")}>Move</h1>
        </div>
        {this.props.user ? <Menu /> : <HeaderBtns />}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);
