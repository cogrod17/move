import React from "react";
import HeaderBtns from "./HeaderBtns";
import Menu from "./Menu";
import history from "../../history";
import { connect } from "react-redux";

const Header = ({ token }) => {
  return (
    <div className="header-container">
      <div className="title">
        <h1 onClick={() => history.push("/")}>Move</h1>
      </div>
      {token ? <Menu /> : <HeaderBtns />}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);
