import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import {
  setCookie,
  getCookieName,
  getCookieDuration
} from "../../../services/cookie.js";

class Language extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = value => {
    setCookie(getCookieName(), value.value, getCookieDuration());
    this.props.languageData(value);
  };

  render() {
    return (
      <div>
        <h4>{this.props.languageLabel}</h4>
        <Select
          value={this.props.language}
          onChange={this.handleChange}
          options={this.props.languageList}
        />
      </div>
    );
  }
}

export default Language;
