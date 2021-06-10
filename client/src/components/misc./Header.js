import React from "react";
import HeaderBtns from "./HeaderBtns";

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <div className="title">
          <h1>Move</h1>
        </div>
        <HeaderBtns />
      </div>
    );
  }
}

export default Header;
