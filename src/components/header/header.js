import React, { Component } from "react";

import "./header.scss";

class Header extends Component {
  render() {
    return (
      <div>
        <h1 className="top-header">
          <b>METSÄMITTARI</b>
        </h1>
      </div>
    );
  }
}

export default Header;
