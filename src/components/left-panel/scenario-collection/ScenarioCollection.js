import React, { Component } from "react";

import Select from "react-select";
import {Button} from 'react-bootstrap'

import "react-select/dist/react-select.css";
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
			<div className="help">
				<Button
					bsStyle='link'
					name={FormControlNames.SCENARIO_COLLECTION}
					onClick={this.props.onToggleAccordionModalClick}>
					[?]
		        </Button>
         	</div>
		</h4>
        <Select
          className="max"
          clearable = {false}
          clearableValue = {false}
          disabled={this.state.dropdownDisabledBool}
          name={FormControlNames.SCENARIO_COLLECTION}
          onChange={this.handleChange}
          options={scenarioCollectionList}
          value={scenarioCollection}
        />
      </div>
    );
  }
}

export default ScenarioCollection;
