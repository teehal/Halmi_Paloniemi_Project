import React, { Component } from "react";
import Select from "react-select";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap'
import "react-select/dist/react-select.css";
import QuickHelp from "../../general/QuickHelp";
import * as FormControlNames from "../../general/FormControls";

class RegionLevels extends Component {

  state = {
    dropdownDisabledBool: true
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this); 
  }

  componentWillMount(){
    if(this.props.regionalLevelList === undefined){
      this.setState({dropdownDisabledBool: true});
    }else{
      this.setState({dropdownDisabledBool: false});
    }
  }

  handleChange = value => {
    if (value !== null) {
      this.props.regionalLevelData(value);
    } else {
      this.props.regionalLevelData("");
    }
  };

  render() {
    const regionalLevel = this.props.regionalLevel;
    const regionalLevelList = this.props.regionalLevelList;
    console.log("RegionLevel render, state: ", this.state);
    console.log("RegionLevel render onToggleAccordionModalClick: ", this.state.onToggleAccordionModalClick);
    return (
      <div>
        <h4>{this.props.regionalLevelLabel}
        	<QuickHelp 
	        	helpTitle={this.props.displayTexts.helpRegionLevelTitle} 
	        	helpText={this.props.displayTexts.helpRegionLevelText}
	        	helpImage={this.props.displayTexts.helpRegionLevelImage}
	        	helpID="helpRegionLevel"
	        	helpLink="#helpRegionLevel"
	        	language={this.props.language}
	        	displayTexts={this.props.displayTexts}
			/>    
		</h4>
		<Button
			bsStyle='link'
			name={FormControlNames.REGION_LEVEL}
			onClick={this.props.onToggleAccordionModalClick}>
			[?]
         </Button>
        <Select
        	name={FormControlNames.REGION_LEVEL}
	          placeholder="Select region level"
	          value={regionalLevel}
	          onChange={this.handleChange}
	          options={regionalLevelList}
	          disabled={this.state.dropdownDisabledBool}
	          clearableValue = {false}
	          clearable = {false}
        />
      </div>
    );
  }
}

export default RegionLevels;
