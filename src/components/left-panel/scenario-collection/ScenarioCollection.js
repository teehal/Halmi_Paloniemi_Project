import React, { Component } from "react";

import Select from "react-select";

import "react-select/dist/react-select.css";

import secondImage from '../../../images/second.png';
import QuickHelp from "../../general/QuickHelp";
import * as FormControlNames from "../../general/FormControls";

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
        <h4>
	        {this.props.scenarioCollectionListLabel} 
	        <QuickHelp 
	        	helpTitle={this.props.displayTexts.helpScenarioCollectionTitle} 
	        	helpText={this.props.displayTexts.helpScenarioCollectionText}
	        	helpImage={this.props.displayTexts.helpScenarioCollectionImage}
	        	helpID="helpScenarioCollections"
	        	helpLink="#helpScenarioCollections"
	        	language={this.props.language}
	        	displayTexts={this.props.displayTexts}
			/>    
		</h4>
        <Select
          name={FormControlNames.SCENARIO_COLLECTION}
          className="max"
          value={scenarioCollection}
          onChange={this.handleChange}
          options={scenarioCollectionList}
          disabled={this.state.dropdownDisabledBool}
          clearableValue = {false}
          clearable = {false}
        />
      </div>
    );
  }
}

export default ScenarioCollection;
