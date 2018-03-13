import React, { Component } from "react";

import Select from "react-select";

import "react-select/dist/react-select.css";

class ScenarioCollection extends Component {
  state = {
    dropdownDisabledBool: true
  };

  handleChange = value => {
    if (value !== null) {
      this.props.scenarioCollectionData(value);
    } else {
      this.props.scenarioCollectionData("");
    }
  };

  componentWillReceiveProps() {
    if (this.props.scenarioCollectionList !== undefined || null) {
      this.setState({ dropdownDisabledBool: false});
    } else {
      this.setState({ dropdownDisabledBool: true});
    }
  }

  render() {
    const scenarioCollectionList = this.props.scenarioCollectionList;
    const scenarioCollection = this.props.scenarioCollection;
    
    return (
      <div>
        <h4>{this.props.scenarioCollectionListLabel}</h4>
        <Select
          name=""
          className="max"
          value={scenarioCollection}
          onChange={this.handleChange}
          options={scenarioCollectionList}
          disabled={this.state.dropdownDisabledBool}
        />
      </div>
    );
  }
}

export default ScenarioCollection;
