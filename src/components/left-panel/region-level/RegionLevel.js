import React, { Component } from "react";
import Select from "react-select";
import { Button } from 'react-bootstrap'
import "react-select/dist/react-select.css";
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
    return (
      <div>
        <h4>{this.props.regionalLevelLabel}
 		<div className="help">
			<Button
				bsStyle='link'
				name={FormControlNames.REGION_LEVEL}
				onClick={this.props.onToggleAccordionModalClick}>
				[?]
	         </Button>
         </div>
		</h4>
		
        <Select
          clearable = {false}
          clearableValue = {false}
          disabled={this.state.dropdownDisabledBool}
          name={FormControlNames.REGION_LEVEL}
          onChange={this.handleChange}
          options={regionalLevelList}
          placeholder="Select region level"
          value={regionalLevel}
         />
      </div>
    );
  }
}

export default RegionLevels;
