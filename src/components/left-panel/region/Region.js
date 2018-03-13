import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

class Region extends Component {

  state = {
    dropdownDisabledBool: true
  };

  handleChange = value => {
    if (value !== null) {
      this.props.regionData(value);
    } else {
      this.props.regionData("");
    }
  };

  componentWillReceiveProps() {
    if (this.props.regionList !== undefined || null) {
      this.setState({ dropdownDisabledBool: false });
    } else {
      this.setState({ dropdownDisabledBool: true });
    }
  }

  render() {
    const regionList = this.props.regionList;
    const region = this.props.region;

    return (
      <div>
        <h4>{this.props.regionLabel}</h4>
        <Select
          name=""
          className=""
          value={region}
          onChange={this.handleChange}
          options={regionList}
          disabled={this.state.dropdownDisabledBool}
        />
      </div>
    );
  }
}

export default Region;
