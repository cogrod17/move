import React from "react";
import HeaderBtns from "./HeaderBtns";
import Menu from "./Menu";
import history from "../../history";

class Header extends React.Component {
  state = { isLoggedIn: true, path: window.location.pathname };

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

export default Header;
