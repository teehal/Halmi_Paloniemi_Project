import React, { Component } from "react";
import Select from "react-select";
import {Button} from 'react-bootstrap'
import "react-select/dist/react-select.css";

import * as FormControlNames from "../../general/FormControls";

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
	//console.log("Region, regionList: ", this.props.regionList);
    return (
      <div>
        <h4>
	        {this.props.regionLabel} 
			<div className="help">
				<Button
					bsStyle='link'
					name={FormControlNames.REGION}
					onClick={this.props.onToggleAccordionModalClick}>
					[?]
		        </Button>
	        </div>
		</h4>     
        <Select
          name={FormControlNames.REGION}
          className=""
          value={region}
          onChange={this.handleChange}
          options={regionList}
          disabled={this.state.dropdownDisabledBool} 
          clearableValue = {false}
          clearable = {false}
        />
           
      </div>
    );
  }
}

export default Region;
